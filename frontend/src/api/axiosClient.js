import axios from "axios";

// ✅ Ưu tiên biến môi trường VITE_API_BASE_URL nếu có,
// nếu không có thì fallback theo origin hiện tại (dùng cho Docker/EC2)
const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_BASE_URL ||
        `${window.location.origin.replace(/\/$/, "")}/api`,
});

// 🟢 Tự động gắn token vào mỗi request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
