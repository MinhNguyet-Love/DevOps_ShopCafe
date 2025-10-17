// export default function Dashboard() {
//     return (
//         <div>
//             <h2>Tổng quan hệ thống</h2>
//             <p>Chào mừng bạn đến với trang quản trị quán cafe ☕</p>
//             <p>Chọn mục bên trái để quản lý sản phẩm, bàn, đơn hàng, hoặc xem báo cáo.</p>
//         </div>
//     );
// }
export default function Dashboard() {
    const styles = {
        page: {
            backgroundColor: "#fffaf5",
            minHeight: "100vh",
            padding: "40px 60px",
            fontFamily: "'Poppins', sans-serif",
            color: "#3e2723",
        },
        title: {
            fontSize: 26,
            fontWeight: 700,
            marginBottom: 16,
            color: "#4e342e",
        },
        card: {
            backgroundColor: "#fdf3e7",
            border: "1px solid #e0c3a3",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
        text: { lineHeight: 1.7, fontSize: 16 },
    };

    return (
        <div style={styles.page}>
            <h2 style={styles.title}>☕ Tổng quan hệ thống</h2>
            <div style={styles.card}>
                <p style={styles.text}>Chào mừng bạn đến với trang quản trị quán cafe!</p>
                <p style={styles.text}>
                    Chọn mục bên trái để quản lý <b>sản phẩm</b>, <b>bàn</b>, <b>đơn hàng</b>, hoặc xem{" "}
                    <b>báo cáo doanh thu</b>.
                </p>
            </div>
        </div>
    );
}