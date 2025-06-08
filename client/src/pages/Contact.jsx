import React from 'react'

const Contact = () => {
  return (
    <div className="bg-black text-white min-h-screen py-20 px-6">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">Kontakt</h1>
      <p className="text-lg text-gray-400 mb-12">
        Du hast Fragen zu unseren Produkten oder deiner Bestellung?  
        Wir sind für dich da.
      </p>

      {/* Contact form */}
      <form className="space-y-6 text-left">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-600 rounded focus:outline-none focus:border-red-600"
            placeholder="Dein Name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm text-gray-300">
            E-Mail
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-600 rounded focus:outline-none focus:border-red-600"
            placeholder="dein@email.de"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-2 text-sm text-gray-300">
            Nachricht
          </label>
          <textarea
            id="message"
            rows="5"
            className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-600 rounded focus:outline-none focus:border-red-600"
            placeholder="Wie können wir dir helfen?"
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-6 py-2 border border-white rounded hover:bg-white hover:text-black transition"
        >
          Nachricht senden
        </button>
      </form>

      {/* Contacts */}
      <div className="mt-16 text-gray-400 text-md">
        <p>Email: kontakt@athrion.de</p>
        <p className="mt-1">Mo–Fr, 8:00 – 20:00</p>
      </div>
    </div>
  </div>
  )
}

export default Contact