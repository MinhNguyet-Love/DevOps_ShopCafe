// import { useNavigate } from "react-router-dom";
//
// export default function Navbar() {
//     const navigate = useNavigate();
//     const username = localStorage.getItem("username");
//     const role = localStorage.getItem("role");
//     const token = localStorage.getItem("token");
//
//     const handleLogout = () => {
//         localStorage.clear();
//         navigate("/login");
//     };
//
//     return (
//         <div
//             style={{
//                 backgroundColor: "#ff6b6b",
//                 padding: "10px 20px",
//                 color: "white",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//             }}
//         >
//             <h2 style={{ margin: 0 }}>☕ CafeShop</h2>
//             <div>
//                 {token ? (
//                     <>
//                         {role === "ADMIN" ? (
//                             <span style={{ marginRight: 10 }}>👑 Admin</span>
//                         ) : (
//                             <span style={{ marginRight: 10 }}>🙋‍♂️ User</span>
//                         )}
//                         <button onClick={handleLogout}>Đăng xuất</button>
//                     </>
//                 ) : (
//                     <button onClick={() => navigate("/login")}>Đăng nhập</button>
//                 )}
//             </div>
//         </div>
//     );
// }
// import { Link, useLocation, useNavigate } from "react-router-dom";
//
// export default function Navbar() {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");
//     const navigate = useNavigate();
//     const location = useLocation();
//
//     const handleLogout = () => {
//         localStorage.clear();
//         navigate("/login");
//     };
//
//     // 🎯 Danh sách menu theo role
//     const menuItems =
//         role === "ADMIN"
//             ? [
//                 { path: "/admin", label: "Tổng quan" },
//                 { path: "/admin/products", label: "Sản phẩm" },
//                 { path: "/admin/tables", label: "Bàn" },
//                 { path: "/admin/orders", label: "Đơn hàng" },
//                 { path: "/admin/reports", label: "Báo cáo" },
//             ]
//             : [
//                 { path: "/", label: "Tables" },
//                 { path: "/booking", label: "Booking" },
//                 { path: "/my-orders", label: "My Orders" },
//             ];
//
//     const styles = {
//         nav: {
//             backgroundColor: "#5d4037",
//             color: "#fff",
//             padding: "12px 40px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             fontFamily: "'Poppins', sans-serif",
//             borderBottom: "3px solid #d7ccc8",
//         },
//         logo: {
//             fontSize: 20,
//             fontWeight: 700,
//             color: "#fff",
//             textDecoration: "none",
//             letterSpacing: "0.5px",
//         },
//         menu: {
//             display: "flex",
//             gap: 20,
//             alignItems: "center",
//         },
//         link: (isActive) => ({
//             color: isActive ? "#ffeb3b" : "#fff",
//             textDecoration: "none",
//             padding: "6px 12px",
//             borderRadius: 6,
//             border: isActive ? "1px solid #ffeb3b" : "1px solid transparent",
//             backgroundColor: isActive ? "#6d4c41" : "transparent",
//             transition: "all 0.2s ease",
//             fontWeight: isActive ? 600 : 400,
//         }),
//         right: {
//             display: "flex",
//             alignItems: "center",
//             gap: 16,
//         },
//         roleBox: {
//             border: "1px solid #ffcc80",
//             borderRadius: 8,
//             padding: "4px 10px",
//             color: "#ffe082",
//             fontWeight: 600,
//             fontSize: 14,
//         },
//         button: {
//             backgroundColor: "#8d6e63",
//             border: "none",
//             color: "#fff",
//             padding: "6px 12px",
//             borderRadius: 6,
//             cursor: "pointer",
//             fontWeight: 600,
//             transition: "background 0.2s ease",
//         },
//     };
//
//     return (
//         <nav style={styles.nav}>
//             <Link to={role === "ADMIN" ? "/admin" : "/"} style={styles.logo}>
//                 ☕ CafeShop
//             </Link>
//
//             <div style={styles.menu}>
//                 {token &&
//                     menuItems.map((item) => (
//                         <Link
//                             key={item.path}
//                             to={item.path}
//                             style={styles.link(location.pathname === item.path)}
//                         >
//                             {item.label}
//                         </Link>
//                     ))}
//             </div>
//
//             <div style={styles.right}>
//                 {token ? (
//                     <>
//                         <div style={styles.roleBox}>
//                             {role === "ADMIN" ? "👑 ADMIN" : "👤 USER"}
//                         </div>
//                         <button style={styles.button} onClick={handleLogout}>
//                             Đăng xuất
//                         </button>
//                     </>
//                 ) : (
//                     <>
//                         <Link to="/login" style={styles.link(location.pathname === "/login")}>
//                             Login
//                         </Link>
//                         <Link
//                             to="/register"
//                             style={styles.link(location.pathname === "/register")}
//                         >
//                             Register
//                         </Link>
//                     </>
//                 )}
//             </div>
//         </nav>
//     );
// }
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username"); // ✅ tên người dùng
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    // 🎯 Danh sách menu
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
                { path: "/", label: "Tables" },
                { path: "/booking", label: "Booking" },
                { path: "/my-orders", label: "My Orders" },
            ];

    const styles = {
        nav: {
            backgroundColor: "#5d4037",
            color: "#fff",
            padding: "12px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "'Poppins', sans-serif",
            borderBottom: "3px solid #d7ccc8",
        },
        logo: {
            fontSize: 20,
            fontWeight: 700,
            color: "#fff",
            textDecoration: "none",
            letterSpacing: "0.5px",
        },
        menu: {
            display: "flex",
            gap: 20,
            alignItems: "center",
        },
        link: (isActive) => ({
            color: isActive ? "#ffeb3b" : "#fff",
            textDecoration: "none",
            padding: "6px 12px",
            borderRadius: 6,
            border: isActive ? "1px solid #ffeb3b" : "1px solid transparent",
            backgroundColor: isActive ? "#6d4c41" : "transparent",
            transition: "all 0.2s ease",
            fontWeight: isActive ? 600 : 400,
        }),
        right: {
            display: "flex",
            alignItems: "center",
            gap: 16,
        },
        userBox: {  // ✅ chỉ còn tên người dùng
            backgroundColor: "#6d4c41",
            borderRadius: 8,
            padding: "6px 10px",
            color: "#fff3e0",
            fontWeight: 500,
            fontSize: 15,
        },
        button: {
            backgroundColor: "#8d6e63",
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

            <div style={styles.menu}>
                {token &&
                    menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={styles.link(location.pathname === item.path)}
                        >
                            {item.label}
                        </Link>
                    ))}
            </div>

            <div style={styles.right}>
                {token ? (
                    <>
                        <div style={styles.userBox}>👋 {username}</div> {/* ✅ chỉ còn tên */}
                        <button style={styles.button} onClick={handleLogout}>
                            Đăng xuất
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={styles.link(location.pathname === "/login")}>
                            Login
                        </Link>
                        <Link
                            to="/register"
                            style={styles.link(location.pathname === "/register")}
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
