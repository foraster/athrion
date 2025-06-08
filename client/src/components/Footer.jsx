import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-12">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
    {/* Logo */}
    <div className="text-xl font-bold">Athrion</div>

    {/* Navigation */}
    <nav className="flex flex-col gap-2">
      <a href="/" className="hover:underline">Startseite</a>
      <a href="/shop" className="hover:underline">Shop</a>
      <a href="/about" className="hover:underline">Über uns</a>
      <a href="/kontakt" className="hover:underline">Kontakt</a>
    </nav>

    {/* legal */}
    <div className="text-sm text-gray-400">
      <a href="/legal/datenschutz" className="hover:underline">Datenschutz</a> |{' '}
      <a href="/legal/impressum" className="hover:underline">Impressum</a>
    </div>
  </div>
</footer>
  )
}

export default Footer