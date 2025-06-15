import { Outlet } from "react-router-dom";

const AdminSettings = () => {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
      <Outlet />
    </div>
  );
};

export default AdminSettings;