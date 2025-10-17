// import { useEffect, useState } from "react";
// import api from "../../api/axiosClient";
//
// export default function TableManager() {
//     const [list, setList] = useState([]);
//     const [form, setForm] = useState({ name: "", capacity: 0, status: "TRỐNG" });
//     const [editingId, setEditingId] = useState(null);
//
//     // 🟢 Lấy danh sách bàn
//     const load = async () => {
//         try {
//             const res = await api.get("/tables");
//             setList(res.data || []);
//         } catch (err) {
//             console.error("❌ Lỗi tải danh sách bàn:", err);
//         }
//     };
//
//     useEffect(() => {
//         load();
//     }, []);
//
//     // 🟢 Lưu bàn mới hoặc cập nhật
//     const save = async () => {
//         const token = localStorage.getItem("token");
//         if (!token) return alert("⚠️ Vui lòng đăng nhập với quyền admin!");
//
//         if (!form.name) return alert("⚠️ Nhập tên bàn!");
//
//         try {
//             if (editingId) {
//                 await api.put(`/tables/${editingId}`, form, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 alert("✅ Cập nhật bàn thành công!");
//             } else {
//                 await api.post("/tables", form, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 alert("✅ Thêm bàn mới thành công!");
//             }
//             setForm({ name: "", capacity: 0, status: "TRỐNG" });
//             setEditingId(null);
//             load();
//         } catch (err) {
//             console.error("❌ Lỗi khi lưu bàn:", err);
//             alert("❌ Không thể lưu bàn (kiểm tra quyền admin hoặc token)!");
//         }
//     };
//
//     const edit = (t) => {
//         setForm(t);
//         setEditingId(t.id);
//     };
//
//     const remove = async (id) => {
//         const token = localStorage.getItem("token");
//         if (!token) return alert("⚠️ Vui lòng đăng nhập với quyền admin!");
//         if (!window.confirm("Xác nhận xóa bàn này?")) return;
//
//         try {
//             await api.delete(`/tables/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             alert("🗑️ Đã xóa bàn!");
//             load();
//         } catch (err) {
//             console.error("❌ Lỗi khi xóa bàn:", err);
//             alert("❌ Không thể xóa bàn (kiểm tra quyền admin hoặc token)!");
//         }
//     };
//
//     return (
//         <div>
//             <h2>🪑 Quản lý bàn</h2>
//             <div className="card" style={{ marginBottom: 16 }}>
//                 <div
//                     style={{
//                         display: "grid",
//                         gridTemplateColumns: "1fr 1fr 1fr",
//                         gap: 12,
//                     }}
//                 >
//                     <input
//                         className="input"
//                         placeholder="Tên bàn"
//                         value={form.name}
//                         onChange={(e) => setForm({ ...form, name: e.target.value })}
//                     />
//                     <input
//                         className="input"
//                         type="number"
//                         placeholder="Sức chứa"
//                         value={form.capacity}
//                         onChange={(e) =>
//                             setForm({ ...form, capacity: Number(e.target.value) })
//                         }
//                     />
//                     <select
//                         className="input"
//                         value={form.status}
//                         onChange={(e) => setForm({ ...form, status: e.target.value })}
//                     >
//                         <option value="TRỐNG">TRỐNG</option>
//                         <option value="CÓ KHÁCH">CÓ KHÁCH</option>
//                         <option value="ĐÃ THANH TOÁN">ĐÃ THANH TOÁN</option>
//                     </select>
//                 </div>
//                 <button className="button primary" onClick={save}>
//                     {editingId ? "💾 Cập nhật" : "➕ Thêm mới"}
//                 </button>
//             </div>
//
//             <table className="table">
//                 <thead>
//                 <tr>
//                     <th>Tên bàn</th>
//                     <th>Sức chứa</th>
//                     <th>Trạng thái</th>
//                     <th>Hành động</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {list.map((t) => (
//                     <tr key={t.id}>
//                         <td>{t.name}</td>
//                         <td>{t.capacity}</td>
//                         <td>{t.status}</td>
//                         <td>
//                             <button className="button" onClick={() => edit(t)}>
//                                 ✏️ Sửa
//                             </button>
//                             <button
//                                 className="button"
//                                 style={{ marginLeft: 8 }}
//                                 onClick={() => remove(t.id)}
//                             >
//                                 🗑️ Xóa
//                             </button>
//                         </td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
import { useEffect, useState } from "react";
import api from "../../api/axiosClient";

export default function TableManager() {
    const [list, setList] = useState([]);
    const [form, setForm] = useState({ name: "", capacity: "", status: "TRỐNG" });
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false); // ✅ popup form

    const load = async () => {
        try {
            const res = await api.get("/tables");
            setList(res.data || []);
        } catch (err) {
            console.error("❌ Lỗi tải bàn:", err);
        }
    };

    useEffect(() => {
        load();
    }, []);

    // 🟤 Thêm hoặc cập nhật bàn
    const save = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return alert("⚠️ Cần đăng nhập admin!");
        if (!form.name) return alert("⚠️ Nhập tên bàn!");

        try {
            if (editingId) {
                await api.put(`/tables/${editingId}`, form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("💾 Cập nhật bàn thành công!");
            } else {
                await api.post("/tables", form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("✅ Thêm bàn mới thành công!");
            }
            setForm({ name: "", capacity: "", status: "TRỐNG" });
            setEditingId(null);
            setShowModal(false);
            load();
        } catch (err) {
            console.error("❌ Lỗi khi lưu bàn:", err);
            alert("❌ Không thể lưu bàn!");
        }
    };

    // 🟤 Nhấn nút sửa
    const edit = (t) => {
        setForm(t);
        setEditingId(t.id);
        setShowModal(true);
    };

    // 🟤 Xóa bàn
    const remove = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) return alert("⚠️ Đăng nhập quyền admin!");
        if (!window.confirm("Xác nhận xoá bàn này?")) return;

        try {
            await api.delete(`/tables/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("🗑️ Đã xoá bàn!");
            load();
        } catch (err) {
            console.error("❌ Lỗi xoá bàn:", err);
        }
    };

    // 🟤 Đổi trạng thái trực tiếp
    const cycleStatus = async (t) => {
        const token = localStorage.getItem("token");
        if (!token) return alert("⚠️ Cần đăng nhập admin!");

        const nextStatus =
            t.status === "TRỐNG"
                ? "CÓ KHÁCH"
                : t.status === "CÓ KHÁCH"
                    ? "ĐÃ THANH TOÁN"
                    : "TRỐNG";

        try {
            await api.put(
                `/tables/${t.id}`,
                { ...t, status: nextStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            load();
        } catch (err) {
            console.error("❌ Lỗi đổi trạng thái:", err);
        }
    };

    // 🎨 Style
    const styles = {
        page: {
            backgroundColor: "#fffaf5",
            minHeight: "100vh",
            padding: "40px 60px",
            fontFamily: "'Poppins', sans-serif",
            color: "#3e2723",
        },
        titleRow: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
        },
        title: { fontSize: 24, fontWeight: 700, color: "#4e342e" },
        addBtn: {
            backgroundColor: "#6d4c41",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 16px",
            cursor: "pointer",
            fontWeight: 600,
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            borderRadius: 10,
            overflow: "hidden",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        },
        th: {
            background: "#d7ccc8",
            padding: 10,
            borderBottom: "2px solid #a1887f",
            textAlign: "left",
            fontWeight: 600,
        },
        td: { padding: 10, color: "#4e342e", fontSize: 14 },
        statusBtn: (status) => ({
            backgroundColor:
                status === "TRỐNG"
                    ? "#a5d6a7"
                    : status === "CÓ KHÁCH"
                        ? "#ffe082"
                        : "#bcaaa4",
            padding: "6px 10px",
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 13,
            border: "none",
            cursor: "pointer",
            transition: "0.2s",
        }),
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
        },
        modal: {
            backgroundColor: "#fff",
            borderRadius: 12,
            padding: "24px 28px",
            width: "400px",
            maxWidth: "90%",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            position: "relative",
        },
        closeBtn: {
            position: "absolute",
            top: 10,
            right: 14,
            fontSize: 20,
            fontWeight: "bold",
            border: "none",
            background: "none",
            cursor: "pointer",
            color: "#6d4c41",
        },
        input: {
            width: "100%",
            padding: 8,
            border: "1px solid #d7ccc8",
            borderRadius: 6,
            marginBottom: 12,
            fontFamily: "inherit",
        },
        button: {
            backgroundColor: "#8d6e63",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "8px 14px",
            cursor: "pointer",
            width: "100%",
            fontWeight: 600,
        },
    };

    return (
        <div style={styles.page}>
            <div style={styles.titleRow}>
                <h2 style={styles.title}>🪑 Quản lý bàn</h2>
                <button
                    style={styles.addBtn}
                    onClick={() => {
                        setEditingId(null);
                        setForm({ name: "", capacity: "", status: "TRỐNG" });
                        setShowModal(true);
                    }}
                >
                    ➕ Thêm bàn
                </button>
            </div>

            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>Tên bàn</th>
                    <th style={styles.th}>Sức chứa</th>
                    <th style={styles.th}>Trạng thái</th>
                    <th style={styles.th}>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {list.map((t) => (
                    <tr key={t.id} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={styles.td}>{t.name}</td>
                        <td style={styles.td}>{t.capacity}</td>
                        <td style={styles.td}>
                            <button
                                style={styles.statusBtn(t.status)}
                                onClick={() => cycleStatus(t)}
                            >
                                {t.status}
                            </button>
                        </td>
                        <td style={styles.td}>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "8px",
                                    justifyContent: "center",
                                }}
                            >
                                <button
                                    title="Sửa bàn"
                                    style={{
                                        background: "#ffe0b2",
                                        border: "none",
                                        borderRadius: 6,
                                        padding: "6px 8px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => edit(t)}
                                >
                                    ✏️
                                </button>
                                <button
                                    title="Xóa bàn"
                                    style={{
                                        background: "#ef9a9a",
                                        border: "none",
                                        borderRadius: 6,
                                        padding: "6px 8px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => remove(t.id)}
                                >
                                    🗑️
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}

                {list.length === 0 && (
                    <tr>
                        <td style={styles.td} colSpan="4" align="center">
                            Chưa có bàn nào
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* ✅ Popup thêm/sửa bàn */}
            {showModal && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <button style={styles.closeBtn} onClick={() => setShowModal(false)}>
                            ×
                        </button>
                        <h3 style={{ textAlign: "center", marginBottom: 20 }}>
                            {editingId ? "✏️ Cập nhật bàn" : "➕ Thêm bàn mới"}
                        </h3>
                        <form onSubmit={save}>
                            <input
                                style={styles.input}
                                placeholder="Tên bàn"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                            <input
                                style={styles.input}
                                type="number"
                                placeholder="Sức chứa"
                                value={form.capacity}
                                onChange={(e) =>
                                    setForm({ ...form, capacity: Number(e.target.value) })
                                }
                                required
                            />
                            <select
                                style={styles.input}
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                            >
                                <option value="TRỐNG">TRỐNG</option>
                                <option value="CÓ KHÁCH">CÓ KHÁCH</option>
                                <option value="ĐÃ THANH TOÁN">ĐÃ THANH TOÁN</option>
                            </select>
                            <button type="submit" style={styles.button}>
                                {editingId ? "💾 Lưu thay đổi" : "✅ Thêm bàn"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
