import { useContext, useState } from "react";
import { Context } from "../../..";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../../utils/consts";

const SettingsProfile = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user.user?.firstName || "");
  const [lastName, setLastName] = useState(user.user?.lastName || "");
  const [editing, setEditing] = useState(false);

  const handleLogout = () => {
    user.setUser({});
    user.setIsAuth(false);
    navigate(LOGIN_ROUTE);
  };

  const handleSave = ()     => {
    user.setUser({
      ...user.user,
      firstName,
      lastName,
    });
    setEditing(false);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold mb-1">Admin Profile</h2>
        <p className="text-gray-400 text-sm">Manage your admin identity and credentials.</p>
      </div>

      {/* Profile block */}
      <div className="bg-neutral-900 p-6 rounded-lg border border-gray-700 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-2xl font-bold text-white">
            {firstName?.[0] || "A"}
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="bg-neutral-800 text-white px-4 py-2 rounded border border-neutral-700"
                />
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="bg-neutral-800 text-white px-4 py-2 rounded border border-neutral-700"
                />
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold">
                  {user.user?.firstName} {user.user?.lastName}
                </h3>
                <p className="text-sm text-gray-400">{user.user?.email}</p>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          {editing ? (
            <>
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-gray-600 rounded text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-white text-black rounded text-sm font-medium hover:bg-gray-200"
              >
                Save changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-neutral-800 border border-gray-600 rounded hover:bg-neutral-700 text-sm"
            >
              Edit profile
            </button>
          )}
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-neutral-900 p-4 rounded-lg border border-red-700">
        <h4 className="text-red-400 font-semibold mb-2 text-sm uppercase tracking-wide">Danger zone</h4>
        <p className="text-sm text-gray-400 mb-4">Log out from the admin panel and return to login screen.</p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SettingsProfile;