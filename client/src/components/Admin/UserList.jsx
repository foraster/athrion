import { useEffect, useState, useMemo } from "react";
import { fetchUsers, deleteUser } from "../../http/userAPI";
import { format } from "date-fns";
import AdminTable from "../Admin/AdminTable";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [error, setError] = useState("");

  // Load users from API on mount
  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch((err) => {
        setError("Failed to load users");
        console.error(err);
      });
  }, []);

  // Automatically uncheck "Select All" when list changes
  useEffect(() => {
    setSelectAll(false);
    setSelectedIds([]);
  }, [users]);

  // Toggle all checkboxes
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedIds(!selectAll ? users.map((u) => u.id) : []);
  };

  // Toggle a single checkbox
  const handleCheckbox = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Delete all selected users
  const handleDeleteSelected = async () => {
    if (!window.confirm("Confirm deletion of selected users?")) return;
    try {
      await Promise.all(selectedIds.map(deleteUser));
      setUsers((prev) => prev.filter((u) => !selectedIds.includes(u.id)));
      setSelectedIds([]);
      setSelectAll(false);
    } catch (err) {
      setError("Failed to delete users");
      console.error(err);
    }
  };

  // Define table columns
  const columns = [
    { label: "ID", key: "id" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
    { label: "Registered", key: "createdAt" },
  ];

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-semibold mb-4">User overview</h2>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {/* Reusable admin table */}
      <AdminTable
        columns={columns}
        data={users}
        renderRow={(user) => (
          <tr key={user.id}>
            <td className="pl-2 py-2">
              <input
                type="checkbox"
                checked={selectedIds.includes(user.id)}
                onChange={() => handleCheckbox(user.id)}
                className="w-4 h-4"
              />
            </td>
            <td className="px-4 py-2">{user.id}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2 capitalize">{user.role}</td>
            <td className="px-4 py-2">
              {user.createdAt
                ? format(new Date(user.createdAt), "yyyy-MM-dd HH:mm")
                : "-"}
            </td>
          </tr>
        )}
        selectAllChecked={selectAll}
        onSelectAllToggle={handleSelectAll}
        emptyText="No users found."
      />

      {/* Bulk delete actions */}
      {selectedIds.length > 0 && (
        <div className="px-2 py-4">
          <button
            onClick={handleDeleteSelected}
            className="bg-red-700 hover:bg-red-600 text-sm font-semibold px-4 py-2 rounded"
          >
            Delete selected ({selectedIds.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default UserList;