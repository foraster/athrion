import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../../http/userAPI"; 
import { format } from "date-fns";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch((err) => {
        setError("Failed to load users");
        console.error(err);
      });
  }, []);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(users.map((u) => u.id));
    }
    setSelectAll(!selectAll);
  };

  const handleCheckbox = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (!window.confirm("Confirm deletion of selected users?")) return;
    try {
      for (const id of selectedIds) {
        await deleteUser(id);
      }
      setUsers(users.filter((u) => !selectedIds.includes(u.id)));
      setSelectedIds([]);
      setSelectAll(false);
    } catch (err) {
      setError("Failed to delete users");
      console.error(err);
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-semibold mb-4">User overview</h2>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      <div className="overflow-x-auto border border-gray-600 rounded-lg">
        <table className="min-w-full text-md text-left">
          <thead className="bg-neutral-800 text-gray-300 uppercase">
            <tr>
              <th className="px-2 py-3">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4"
                />
              </th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Registered</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-900 divide-y divide-neutral-700">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="pl-2 py-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(u.id)}
                    onChange={() => handleCheckbox(u.id)}
                    className="w-4 h-4"
                  />
                </td>
                <td className="px-4 py-2">{u.id}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2 capitalize">{u.role}</td>
                <td className="px-4 py-2">
                  {format(new Date(u.createdAt), "yyyy-MM-dd HH:mm")}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="px-2 py-2">
          {selectedIds.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="bg-red-700 hover:bg-red-600 text-sm font-semibold px-4 py-2 rounded"
            >
              Delete selected ({selectedIds.length})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
