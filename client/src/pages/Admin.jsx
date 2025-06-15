import { Routes, Route, Navigate   } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import { adminRoutes } from "../routes";
import RequireAdmin from "../middleware/requireAdmin";
import { ADMIN_ROUTE, DASHBOARD_ROUTE } from "../utils/consts";

const Admin = () => {
  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <Routes>
          {adminRoutes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <RequireAdmin>
                  <Component />
                </RequireAdmin>
              }
            />
          ))}
          <Route path="*" element={<Navigate to={ADMIN_ROUTE + DASHBOARD_ROUTE} replace />}/>
        </Routes>
      </main>
    </div>
  );
};

export default Admin;
