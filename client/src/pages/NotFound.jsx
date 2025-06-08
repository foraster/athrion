import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Seite nicht gefunden.</p>
      <Link
        to="/"
        className="px-6 py-2 border border-white rounded hover:bg-white hover:text-black transition"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
};

export default NotFound;