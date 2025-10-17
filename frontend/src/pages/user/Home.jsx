// import { useEffect, useState } from "react";
// import api from "../../api/axiosClient";
//
// export default function Home() {
//     const [tables, setTables] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         (async () => {
//             try {
//                 // ✅ Lấy chỉ bàn TRỐNG
//                 const res = await api.get("/tables?status=TRỐNG");
//                 setTables(res.data || []);
//             } catch (err) {
//                 console.error("❌ Lỗi khi tải bàn:", err);
//             } finally {
//                 setLoading(false);
//             }
//         })();
//     }, []);
//
//     if (loading) return <p>Đang tải dữ liệu...</p>;
//
//     return (
//         <div className="container">
//             <h2>Danh sách bàn trống ☕</h2>
//             <div className="grid">
//                 {tables.length === 0 && <p>Không còn bàn trống nào!</p>}
//                 {tables.map((t) => (
//                     <div key={t.id} className="card">
//                         <h4>{t.name}</h4>
//                         <p>Sức chứa: {t.capacity} người</p>
//                         <p>Trạng thái: {t.status}</p>
//                         <a href={`/booking?tableId=${t.id}`} className="button primary">
//                             Chọn bàn
//                         </a>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
import { useEffect, useState } from "react";
import api from "../../api/axiosClient";

export default function Home() {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get("/tables?status=TRỐNG");
                setTables(res.data || []);
            } catch (err) {
                console.error("❌ Lỗi khi tải bàn:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading)
        return (
            <div style={{ textAlign: "center", marginTop: 80, color: "#6d4c41" }}>
                ☕ Đang tải danh sách bàn...
            </div>
        );

    const styles = {
        page: {
            backgroundColor: "#fdf6f2",
            minHeight: "100vh",
            padding: "60px 100px",
            fontFamily: "'Poppins', sans-serif",
        },
        title: {
            textAlign: "center",
            color: "#4e342e",
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 10,
        },
        subtitle: {
            textAlign: "center",
            color: "#795548",
            fontStyle: "italic",
            marginBottom: 40,
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 50, // ✅ tăng khoảng cách giữa các bàn
            justifyItems: "center",
        },
        card: {
            backgroundColor: "#fff",
            borderRadius: 16,
            border: "1px solid #e0c3a3",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            padding: "26px 22px",
            width: "100%",
            maxWidth: 250,
            textAlign: "center",
            transition: "transform 0.25s ease, box-shadow 0.25s ease, border 0.25s ease",
        },
        cardHover: `
        .table-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 18px rgba(0,0,0,0.15);
          border-color: #bcaaa4;
          background-color: #fffaf5;
        }
        .table-card:hover .choose-btn {
          background-color: #4e342e;
        }
      `,
        name: {
            color: "#3e2723",
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 8,
        },
        text: {
            color: "#5d4037",
            fontSize: 14,
            margin: "6px 0",
        },
        button: {
            marginTop: 16,
            backgroundColor: "#8d6e63",
            color: "#fff",
            border: "none",
            borderRadius: 30,
            padding: "8px 16px",
            cursor: "pointer",
            fontWeight: 600,
            transition: "background 0.2s ease",
            display: "inline-block",
        },
    };

    return (
        <div style={styles.page}>
            <style>{styles.cardHover}</style>
            <h2 style={styles.title}>Danh sách bàn trống ☕</h2>
            <p style={styles.subtitle}>
                Chọn bàn bạn muốn đặt để thưởng thức hương vị cà phê thơm ngon nhất.
            </p>

            <div style={styles.grid}>
                {tables.length === 0 ? (
                    <p>Không còn bàn trống nào!</p>
                ) : (
                    tables.map((t) => (
                        <div key={t.id} className="table-card" style={styles.card}>
                            <div style={styles.name}>{t.name}</div>
                            <p style={styles.text}>🪑 Sức chứa: {t.capacity} người</p>
                            <p style={styles.text}>
                                📍 Trạng thái:{" "}
                                <span style={{ color: "#2e7d32", fontWeight: 600 }}>
                                    {t.status}
                                </span>
                            </p>
                            <a
                                href={`/booking?tableId=${t.id}`}
                                className="choose-btn"
                                style={styles.button}
                            >
                                Chọn bàn
                            </a>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
