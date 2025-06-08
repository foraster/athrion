import React from 'react'

const Impressum = () => {
  return (
    <div className="bg-black text-white min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>

        <div className="text-gray-300 text-sm space-y-6 mb-16 leading-relaxed">
          <p>
            <strong>1. Geltungsbereich</strong><br />
            Diese Allgemeinen Geschäftsbedingungen gelten für alle Bestellungen, die über unseren Online-Shop KraftRaum getätigt werden.
          </p>
          <p>
            <strong>2. Vertragspartner</strong><br />
            Der Kaufvertrag kommt zustande mit: <br />
            KraftRaum – Inhaber: Max Mustermann<br />
            Beispielstraße 12, 12345 Berlin, Deutschland
          </p>
          <p>
            <strong>3. Vertragsschluss</strong><br />
            Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot dar. Durch das Anklicken des Bestellbuttons geben Sie eine verbindliche Bestellung ab.
          </p>
          <p>
            <strong>4. Preise und Versand</strong><br />
            Alle Preise enthalten die gesetzliche Mehrwertsteuer. Der Versand erfolgt ab Lager Deutschland.
          </p>
          <p>
            <strong>5. Widerrufsrecht</strong><br />
            Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Nähere Informationen finden Sie unter <a href="/widerruf" className="text-red-500 hover:underline">Widerruf</a>.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4">Impressum</h2>
        <div className="text-gray-300 text-sm space-y-2 leading-relaxed">
          <p><strong>KraftRaum</strong></p>
          <p>Inhaber: Max Mustermann</p>
          <p>Beispielstraße 12</p>
          <p>12345 Berlin</p>
          <p>Deutschland</p>
          <p>E-Mail: kontakt@kraftraum.de</p>
          <p>Umsatzsteuer-ID: DE123456789</p>
        </div>
      </div>
    </div>
  )
}

export default Impressum