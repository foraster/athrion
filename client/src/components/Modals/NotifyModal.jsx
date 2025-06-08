import React from 'react'

const NotifyModal = ({message, setShowModal, type}) => {
    const colorClasses = {
        error: "text-red-600",
        success: "text-green-600",
    }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] text-white rounded-2xl p-8 w-[90%] max-w-xl shadow-2xl border border-red-600 transition-all">
        <h3 className="text-2xl font-semibold mb-2">Hinweis</h3>
        <p className={`text-lg ${colorClasses[type] || "text-gray-600"} `}>{message}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {setShowModal(false)}}
            className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotifyModal