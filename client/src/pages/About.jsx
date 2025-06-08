import React from 'react'

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Über Athrion</h1>
        <p className="text-lg text-gray-400 leading-relaxed mb-12">
          Athrion ist kein gewöhnlicher Shop. Es ist ein Ort für Klarheit, für stille Entschlossenheit.  
          <br /><br />
          Unsere Philosophie ist einfach: <span className="text-white font-medium">Disziplin. Minimalismus. Funktionalität. </span>  
          Alles, was du brauchst, um zu Hause echte Ergebnisse zu erzielen — ohne Ausreden, ohne Ablenkungen.
        </p>

        <div className="grid md:grid-cols-2 gap-12 text-left">
          {/* Секция 1 */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Was wir glauben</h2>
            <p className="text-gray-400 leading-relaxed">
              Kraft beginnt nicht im Gym. Sie beginnt in dir — mit klaren Zielen, einfachen Tools und der täglichen Entscheidung, stark zu sein.
            </p>
          </div>

          {/* Секция 2 */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Was uns auszeichnet</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Minimalistisches, platzsparendes Equipment</li>
              <li>Professionelle Verarbeitung, langlebig und effektiv</li>
              <li>Schneller Versand aus Deutschland</li>
              <li>Klare, ehrliche Kommunikation</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold italic text-gray-300">
            „Disziplin ist deine stärkste Waffe.“
          </h2>
          <p className="mt-2 text-gray-500">– Athrion</p>
        </div>
      </div>
    </div>
  )
}

export default About