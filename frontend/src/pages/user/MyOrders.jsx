// import { useEffect, useState } from "react";
// import api from "../../api/axiosClient";
//
// export default function MyOrders() {
//     const [orders, setOrders] = useState([]);
//
//     useEffect(() => {
//         (async () => {
//             try {
//                 const userId = localStorage.getItem("userId");
//                 const res = await api.get(`/orders/user/${userId}`);
//                 setOrders(res.data || []);
//             } catch (err) {
//                 console.error("❌ Lỗi khi tải đơn:", err);
//             }
//         })();
//     }, []);
//
//     return (
//         <div className="container">
//             <h2>🧾 Đơn hàng của tôi</h2>
//             <div className="grid">
//                 {orders.length === 0 && <p>Bạn chưa có đơn hàng nào.</p>}
//                 {orders.map((o) => (
//                     <div key={o.id} className="card">
//                         <p><strong>Bàn:</strong> {o.tableId}</p>
//                         <p><strong>Ngày:</strong> {o.businessDate}</p>
//                         <p><strong>Tổng tiền:</strong> {o.totalPrice?.toLocaleString()} đ</p>
//                         <ul>
//                             {o.items?.map((i, idx) => (
//                                 <li key={idx}>
//                                     {i.productName} × {i.quantity}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
// import { useEffect, useState } from "react";
// import api from "../../api/axiosClient";
//
// export default function MyOrders() {
//     const [orders, setOrders] = useState([]);
//
//     useEffect(() => {
//         (async () => {
//             try {
//                 const userId = localStorage.getItem("userId");
//                 const res = await api.get(`/orders/user/${userId}`);
//                 setOrders(res.data || []);
//             } catch (err) {
//                 console.error("❌ Lỗi khi tải đơn:", err);
//             }
//         })();
//     }, []);
//
//     const styles = {
//         page: {
//             backgroundColor: "#fffaf5",
//             minHeight: "100vh",
//             padding: "40px 60px",
//             fontFamily: "'Poppins', sans-serif",
//         },
//         title: {
//             color: "#4e342e",
//             textAlign: "center",
//             fontSize: 26,
//             marginBottom: 24,
//             fontWeight: 600,
//         },
//         grid: {
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
//             gap: 24,
//         },
//         card: {
//             backgroundColor: "#fdf6f2",
//             border: "1px solid #e0c3a3",
//             borderRadius: 12,
//             padding: 18,
//             boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
//             transition: "transform 0.2s ease, box-shadow 0.2s ease",
//         },
//         cardHover: `
//       .order-card:hover {
//         transform: translateY(-4px);
//         box-shadow: 0 6px 14px rgba(0,0,0,0.2);
//       }
//     `,
//         label: {
//             color: "#4e342e",
//             fontWeight: 600,
//         },
//         list: {
//             listStyle: "none",
//             padding: 0,
//             marginTop: 10,
//             color: "#5d4037",
//             fontSize: 14,
//         },
//         empty: {
//             textAlign: "center",
//             color: "#795548",
//             fontSize: 16,
//             marginTop: 30,
//         },
//     };
//
//     return (
//         <div style={styles.page}>
//             <style>{styles.cardHover}</style>
//
//             <h2 style={styles.title}>🧾 Đơn hàng của tôi</h2>
//
//             {orders.length === 0 ? (
//                 <p style={styles.empty}>Bạn chưa có đơn hàng nào.</p>
//             ) : (
//                 <div style={styles.grid}>
//                     {orders.map((o) => (
//                         <div key={o.id} className="order-card" style={styles.card}>
//                             <p>
//                                 <span style={styles.label}>Bàn:</span>{" "}
//                                 {o.tableName || "Không rõ"} {/* ✅ dùng tableName */}
//                             </p>
//                             <p>
//                                 <span style={styles.label}>Ngày:</span>{" "}
//                                 {o.businessDate
//                                     ? new Date(o.businessDate).toLocaleDateString("vi-VN")
//                                     : "Không có"}
//                             </p>
//                             <p>
//                                 <span style={styles.label}>Tổng tiền:</span>{" "}
//                                 {o.totalPrice?.toLocaleString()} đ
//                             </p>
//
//                             <ul style={styles.list}>
//                                 {o.items?.map((i, idx) => (
//                                     <li key={idx}>
//                                         • {i.productName} × {i.quantity}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }
import { useEffect, useState } from "react";
import api from "../../api/axiosClient";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await api.get("/orders/my", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(res.data || []);
            } catch (err) {
                console.error("❌ Lỗi khi tải đơn:", err);
            }
        })();
    }, []);

    const styles = {
        page: {
            backgroundColor: "#fffaf5",
            minHeight: "100vh",
            padding: "40px 60px",
            fontFamily: "'Poppins', sans-serif",
        },
        title: {
            color: "#4e342e",
            textAlign: "center",
            fontSize: 26,
            marginBottom: 24,
            fontWeight: 600,
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
        },
        card: {
            backgroundColor: "#fdf6f2",
            border: "1px solid #e0c3a3",
            borderRadius: 12,
            padding: 18,
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
        },
        cardHover: `
            .order-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 6px 14px rgba(0,0,0,0.2);
            }
        `,
        label: {
            color: "#4e342e",
            fontWeight: 600,
        },
        list: {
            listStyle: "none",
            padding: 0,
            marginTop: 10,
            color: "#5d4037",
            fontSize: 14,
        },
        empty: {
            textAlign: "center",
            color: "#795548",
            fontSize: 16,
            marginTop: 30,
        },
    };

    return (
        <div style={styles.page}>
            <style>{styles.cardHover}</style>
            <h2 style={styles.title}>🧾 Đơn hàng của tôi</h2>

            {orders.length === 0 ? (
                <p style={styles.empty}>Bạn chưa có đơn hàng nào.</p>
            ) : (
                <div style={styles.grid}>
                    {orders.map((o) => (
                        <div key={o.id} className="order-card" style={styles.card}>
                            <p>
                                <span style={styles.label}>Bàn:</span>{" "}
                                {o.tableName || "Không rõ"}
                            </p>
                            <p>
                                <span style={styles.label}>Ngày:</span>{" "}
                                {o.businessDate
                                    ? new Date(o.businessDate).toLocaleDateString("vi-VN")
                                    : "Không có"}
                            </p>
                            <p>
                                <span style={styles.label}>Tổng tiền:</span>{" "}
                                {o.totalPrice?.toLocaleString()} đ
                            </p>
                            <ul style={styles.list}>
                                {o.items?.map((i, idx) => (
                                    <li key={idx}>
                                        • {i.productName} × {i.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
