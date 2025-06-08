import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div
        className="w-full h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/img/background/homepage_bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.8)]" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Stärke ohne Fitnessstudio.
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            Heimtraining. Professionelle Ausrüstung.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-3 bg-black border border-white rounded-md hover:bg-white hover:text-black transition"
          >
            Zum Shop
          </button>
        </div>
      </div>

      {/* Our equipment block */}
      <section className="bg-[#121212] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Unsere Ausrüstung</h2>
          <p className="text-lg text-gray-400">
            Tools für deine Stärke. Minimal. Effektiv.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { label: "Klimmzugstangen", icon: "/icons/pullup.svg" },
            { label: "Kurzhanteln", icon: "/icons/dumbbell.svg" },
            { label: "Widerstandsbänder", icon: "/icons/band.svg" },
            { label: "Sportbekleidung", icon: "/icons/shirt.svg" },
          ].map(({ label, icon }) => (
            <div
              key={label}
              className="border border-white rounded-xl p-6 flex flex-col items-center justify-center hover:border-red-600 transition cursor-pointer"
            >
              <img src={icon} alt={label} className="w-12 h-12 mb-4 invert" />
              <span className="text-white font-medium text-lg text-center">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Motivation block */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Kraft beginnt zu Hause.</h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Unsere Philosophie ist einfach: Disziplin, Klarheit und
              funktionelle Ausrüstung — ganz ohne Fitnessstudio. <br /> <br />
              Kraft entsteht in Stille.
            </p>
          </div>
          <div className="w-full h-96">
            <img
              src="/img/brand_photo.jpg"
              alt="Mann mit Klimmzugstange"
              className="w-full h-full object-cover rounded-xl shadow"
            />
          </div>
        </div>
      </section>

      {/* Why us block */}
      <section className="bg-[#1a1a1a] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Warum Athrion?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          {[
            {
              icon: "/icons/design.svg",
              title: "Minimalistisches Design",
              description: "Für jeden Raum.",
            },
            {
              icon: "/icons/quality.svg",
              title: "Professionelle Qualität",
              description: "Für echte Ergebnisse.",
            },
            {
              icon: "/icons/package.svg",
              title: "Schneller Versand",
              description: "Ab Lager Deutschland.",
            },
          ].map(({ icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-4 p-6 border border-white rounded-xl hover:border-red-600 transition"
            >
              <img src={icon} alt={title} className="w-10 h-10 invert" />
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-gray-400 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </section>

          
    </main>
  );
};

export default Home;
