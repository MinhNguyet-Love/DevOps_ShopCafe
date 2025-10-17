// import React from "react";
// import { Navigate } from "react-router-dom";
//
// export default function ProtectedRoute({ role, children }) {
//     const token = localStorage.getItem("token");
//     const userRole = localStorage.getItem("role"); // ADMIN / USER
//
//     // ⛔ Nếu chưa đăng nhập
//     if (!token) {
//         alert("⚠️ Bạn cần đăng nhập trước!");
//         return <Navigate to="/login" replace />;
//     }
//
//     // ⛔ Nếu yêu cầu quyền cụ thể nhưng không đúng role
//     if (role && userRole !== role) {
//         alert("❌ Bạn không có quyền truy cập trang này!");
//         return <Navigate to="/" replace />;
//     }
//
//     // ✅ Nếu hợp lệ
//     return children;
// }
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/login" replace />;
    return children;
}
