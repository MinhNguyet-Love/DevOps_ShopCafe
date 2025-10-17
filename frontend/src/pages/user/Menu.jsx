// import { useEffect, useState } from "react";
// import api from "../../api/axiosClient";
//
// export default function Menu() {
//     const [items, setItems] = useState([]);
//
//     useEffect(() => {
//         (async () => {
//             try {
//                 const res = await api.get("/products");
//                 setItems(res.data || []);
//             } catch (err) {
//                 console.error("❌ Lỗi khi tải menu:", err);
//             }
//         })();
//     }, []);
//
//     return (
//         <div className="container">
//             <h2>Menu quán cafe</h2>
//             <div className="grid">
//                 {items.map((p) => (
//                     <div key={p.id} className="card">
//                         <img
//                             src={
//                                 p.imageUrl
//                                     ? `http://localhost:8080${p.imageUrl}`
//                                     : "https://via.placeholder.com/300x180"
//                             }
//                             alt={p.name}
//                             style={{ width: "100%", height: 160, borderRadius: 8 }}
//                         />
//                         <h4>{p.name}</h4>
//                         <p>{p.category}</p>
//                         <p>
//                             <strong>{p.price?.toLocaleString()} đ</strong>
//                         </p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const navigate = useNavigate();
    const location = useLocation();

    const [activePath, setActivePath] = useState(location.pathname);

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const menuItems =
        role === "ADMIN"
            ? [
                { path: "/admin", label: "Tổng quan" },
                { path: "/admin/products", label: "Sản phẩm" },
                { path: "/admin/tables", label: "Bàn" },
                { path: "/admin/orders", label: "Đơn hàng" },
                { path: "/admin/reports", label: "Báo cáo" },
            ]
            : [
                { path: "/", label: "Menu" },
                { path: "/booking", label: "Booking" },
                { path: "/my-orders", label: "My Orders" },
            ];

    const styles = {
        nav: {
            backgroundColor: "#4e342e",
            color: "#fff",
            padding: "14px 50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            position: "sticky",
            top: 0,
            zIndex: 1000,
        },
        logo: {
            fontSize: 22,
            fontWeight: 700,
            color: "#fff",
            textDecoration: "none",
            letterSpacing: "0.7px",
        },
        menu: {
            display: "flex",
            alignItems: "center",
            gap: 26,
        },
        link: (isActive) => ({
            color: "#fff",
            fontSize: 15,
            fontWeight: 500,
            textDecoration: "none",
            position: "relative",
            paddingBottom: 4,
            transition: "color 0.2s ease",
            ...(isActive && {
                color: "#ffeb3b",
                fontWeight: 600,
            }),
        }),
        underline: (isActive) => ({
            position: "absolute",
            left: 0,
            bottom: -2,
            height: 2,
            width: isActive ? "100%" : "0%",
            backgroundColor: "#ffeb3b",
            borderRadius: 2,
            transition: "width 0.25s ease",
        }),
        right: {
            display: "flex",
            alignItems: "center",
            gap: 14,
        },
        roleBox: {
            border: "1px solid #ffcc80",
            borderRadius: 8,
            padding: "4px 10px",
            color: "#ffe082",
            fontWeight: 600,
            fontSize: 14,
            backgroundColor: "rgba(255,255,255,0.1)",
        },
        button: {
            backgroundColor: "#6d4c41",
            border: "none",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 600,
            transition: "background 0.2s ease",
        },
    };

    return (
        <nav style={styles.nav}>
            <Link to={role === "ADMIN" ? "/admin" : "/"} style={styles.logo}>
                ☕ CafeShop
            </Link>

            {token && (
                <div style={styles.menu}>
                    {menuItems.map((item) => {
                        const isActive = activePath === item.path;
                        return (
                            <div key={item.path} style={{ position: "relative" }}>
                                <Link to={item.path} style={styles.link(isActive)}>
                                    {item.label}
                                </Link>
                                <div style={styles.underline(isActive)} />
                            </div>
                        );
                    })}
                </div>
            )}

            <div style={styles.right}>
                {token ? (
                    <>
                        <div style={styles.roleBox}>
                            {role === "ADMIN" ? "👑 ADMIN" : "👤 USER"}
                        </div>
                        <button
                            style={styles.button}
                            onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor = "#3e2723")
                            }
                            onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor = "#6d4c41")
                            }
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={styles.link(activePath === "/login")}>
                            Login
                        </Link>
                        <Link to="/register" style={styles.link(activePath === "/register")}>
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}