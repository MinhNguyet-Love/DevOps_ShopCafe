import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div className="layout">
            <aside className="sidebar">
                {/*<h3>Quản trị</h3>*/}
                {/*<nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>*/}
                {/*    <NavLink to="/admin">Tổng quan</NavLink>*/}
                {/*    <NavLink to="/admin/products">Sản phẩm</NavLink>*/}
                {/*    <NavLink to="/admin/tables">Bàn</NavLink>*/}
                {/*    <NavLink to="/admin/orders">Đơn hàng</NavLink>*/}
                {/*    <NavLink to="/admin/reports">Báo cáo</NavLink>*/}
                {/*</nav>*/}
            </aside>

            <main className="content">
                <Outlet />
            </main>
        </div>
    );
}
