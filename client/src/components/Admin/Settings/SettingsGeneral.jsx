import { useState } from "react";

const SettingsGeneral = () => {
  const [shopName, setShopName] = useState("Athrion");
  const [contactEmail, setContactEmail] = useState("info@athrion.de");
  const [supportPhone, setSupportPhone] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSave = () => {
    // TODO: Implement actual save logic
    alert("Settings saved (local only for now)");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-xl font-bold mb-1">General Settings</h2>
      <div className="bg-neutral-900 p-6 rounded-lg border border-gray-700 space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Shop Name</label>
          <input
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-full bg-neutral-800 text-white px-4 py-2 rounded border border-neutral-700"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Contact Email</label>
          <input
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="w-full bg-neutral-800 text-white px-4 py-2 rounded border border-neutral-700"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Support Phone</label>
          <input
            value={supportPhone}
            onChange={(e) => setSupportPhone(e.target.value)}
            className="w-full bg-neutral-800 text-white px-4 py-2 rounded border border-neutral-700"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={maintenanceMode}
            onChange={(e) => setMaintenanceMode(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-sm text-gray-300">Enable maintenance mode</label>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-white text-black rounded font-medium hover:bg-gray-200"
      >
        Save Changes
      </button>
    </div>
  );
};

export default SettingsGeneral;