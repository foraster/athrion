const NotifyModal = ({ message, setShowModal, type }) => {
  // Define styles based on notification type
  const colorStyles = {
    error: {
      title: "text-red-500",
      border: "border-red-800",
      icon: "bg-red-600",
    },
    success: {
      title: "text-green-500",
      border: "border-green-800",
      icon: "bg-green-600",
    },
  };
  // Default style if type is not recognized
  const style = colorStyles[type] || {
    title: "text-gray-400",
    border: "border-gray-600",
    icon: "bg-gray-600",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div
        className={`bg-[#121212] text-white rounded-2xl p-8 w-[90%] max-w-md shadow-2xl border ${style.border} transition-all`}
      >
        {/* Header with icon and title */}
        <div className="flex items-center mb-4">
          <div className={`w-3 h-3 rounded-full ${style.icon} mr-3`} />
          <h3 className={`text-2xl font-semibold ${style.title}`}>
            {type === "success" ? "Erfolg" : "Fehler"}
          </h3>
        </div>

        {/* Message content */}
        <p className="text-md text-gray-300 leading-relaxed">{message}</p>

        {/* Close button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 rounded border border-gray-500 text-gray-200 hover:bg-white hover:text-black transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotifyModal;
