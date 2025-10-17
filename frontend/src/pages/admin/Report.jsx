// import { useState } from "react";
// import api from "../../api/axiosClient";
//
// export default function Report() {
//     const [date, setDate] = useState("");
//     const [orders, setOrders] = useState([]);
//     const [total, setTotal] = useState(0);
//
//     const load = async () => {
//         if (!date) return alert("Chọn ngày báo cáo");
//         const res = await api.get(`/report/daily?date=${date}`);
//         setOrders(res.data || []);
//         const totalMoney = res.data.reduce(
//             (sum, o) => sum + (o.total || 0),
//             0
//         );
//         setTotal(totalMoney);
//     };
//
//     return (
//         <div>
//             <h2>Báo cáo doanh thu</h2>
//             <div style={{ marginBottom: 16 }}>
//                 <input
//                     className="input"
//                     type="date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                 />
//                 <button className="button primary" onClick={load}>
//                     Xem báo cáo
//                 </button>
//             </div>
//
//             <table className="table">
//                 <thead>
//                 <tr>
//                     <th>Bàn</th>
//                     <th>Ngày</th>
//                     <th>Số món</th>
//                     <th>Tổng tiền</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {orders.map((o) => (
//                     <tr key={o.id}>
//                         <td>{o.tableId}</td>
//                         <td>{o.businessDate}</td>
//                         <td>{o.items?.length}</td>
//                         <td>{o.total?.toLocaleString()} đ</td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//
//             {orders.length > 0 && (
//                 <div style={{ textAlign: "right", marginTop: 12 }}>
//                     <strong>Tổng doanh thu: {total.toLocaleString()} đ</strong>
//                 </div>
//             )}
//         </div>
//     );
// }
import { useEffect, useState } from "react";
import api from "../../api/axiosClient";

export default function Report() {
    const [date, setDate] = useState("");
    const [orders, setOrders] = useState([]);
    const [tables, setTables] = useState([]);
    const [total, setTotal] = useState(0);

    // 🟢 Lấy danh sách bàn
    const loadTables = async () => {
        try {
            const res = await api.get("/tables");
            setTables(res.data || []);
        } catch (err) {
            console.error("❌ Lỗi khi tải bàn:", err);
        }
    };

    // 🟢 Lấy báo cáo doanh thu
    const loadReport = async () => {
        if (!date) return alert("⚠️ Chọn ngày cần xem báo cáo!");
        try {
            const res = await api.get(`/report/daily?date=${date}`);
            const data = res.data || [];
            setOrders(data);

            // Tính tổng tiền
            const totalMoney = data.reduce((sum, o) => sum + (o.total || 0), 0);
            setTotal(totalMoney);
        } catch (err) {
            console.error("❌ Lỗi khi tải báo cáo:", err);
            alert("❌ Không thể tải báo cáo!");
        }
    };

    useEffect(() => {
        loadTables();
    }, []);

    // 🟤 Hàm tìm tên bàn theo ID
    const getTableName = (id) => {
        const t = tables.find((tb) => tb.id === id);
        return t ? t.name : "(Bàn đã xoá)";
    };

    // 🎨 Style thống nhất
    const styles = {
        page: {
            backgroundColor: "#fffaf5",
            minHeight: "100vh",
            padding: "40px 60px",
            fontFamily: "'Poppins', sans-serif",
            color: "#3e2723",
        },
        title: {
            fontSize: 24,
            fontWeight: 700,
            color: "#4e342e",
            marginBottom: 20,
        },
        input: {
            padding: 6,
            borderRadius: 6,
            border: "1px solid #d7ccc8",
            marginRight: 8,
        },
        button: {
            backgroundColor: "#8d6e63",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "6px 10px",
            cursor: "pointer",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            marginTop: 16,
            borderRadius: 8,
            overflow: "hidden",
        },
        th: {
            background: "#d7ccc8",
            padding: 10,
            border: "1px solid #bbb",
        },
        td: {
            padding: 8,
            border: "1px solid #ddd",
            textAlign: "center",
        },
        totalBox: {
            backgroundColor: "#f7ede2",
            padding: "12px 18px",
            borderRadius: 8,
            marginTop: 20,
            textAlign: "right",
            fontWeight: "bold",
            color: "#4e342e",
            fontSize: 17,
        },
    };

    return (
        <div style={styles.page}>
            <h2 style={styles.title}>📈 Báo cáo doanh thu</h2>
            <div>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={styles.input}
                />
                <button onClick={loadReport} style={styles.button}>
                    Xem báo cáo
                </button>
            </div>

            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>Bàn</th>
                    <th style={styles.th}>Ngày</th>
                    <th style={styles.th}>Số món</th>
                    <th style={styles.th}>Tổng tiền</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((o) => (
                    <tr key={o.id}>
                        <td style={styles.td}>{getTableName(o.tableId)}</td>
                        <td style={styles.td}>{o.businessDate}</td>
                        <td style={styles.td}>{o.items?.length || 0}</td>
                        <td style={styles.td}>{(o.total || 0).toLocaleString()} đ</td>
                    </tr>
                ))}
                {orders.length === 0 && (
                    <tr>
                        <td style={styles.td} colSpan="4">
                            Không có dữ liệu cho ngày này
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {orders.length > 0 && (
                <div style={styles.totalBox}>
                    Tổng doanh thu: {total.toLocaleString()} đ
                </div>
            )}
        </div>
    );
}
