import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import { adminRoutes } from "../routes";
import RequireAdmin from "../middleware/requireAdmin";

const Admin = () => {
  return (
    <div className="min-h-screen flex bg-[#0f0f0f] text-white">
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
              exact
            />
          ))}
        </Routes>
      </main>
    </div>
  );
};

export default Admin;
