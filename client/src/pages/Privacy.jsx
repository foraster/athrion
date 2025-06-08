import React from 'react'

const Privacy = () => {
  return (
    <div className="bg-black text-white min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

        <div className="text-gray-300 text-sm space-y-6 leading-relaxed">
          <p>
            Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen.  
            Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften.
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2">1. Verantwortlicher</h2>
            <p>
              Athrion – Inhaber: Max Mustermann<br />
              Beispielstraße 12<br />
              12345 Berlin<br />
              E-Mail: kontakt@athrion.de
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Erhebung und Verarbeitung von Daten</h2>
            <p>
              Wir erheben und verarbeiten personenbezogene Daten nur, wenn Sie uns diese im Rahmen einer Bestellung oder Kontaktaufnahme freiwillig mitteilen.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Nutzung der Daten</h2>
            <p>
              Ihre Daten werden ausschließlich zur Vertragsabwicklung und zur Bearbeitung Ihrer Anfragen verwendet.  
              Eine Weitergabe an Dritte erfolgt nicht ohne Ihre ausdrückliche Zustimmung.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Cookies</h2>
            <p>
              Unsere Website verwendet Cookies, um die Nutzererfahrung zu verbessern. Sie können die Verwendung von Cookies in Ihrem Browser deaktivieren.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger sowie den Zweck der Datenverarbeitung.  
              Ebenso haben Sie das Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Kontakt</h2>
            <p>
              Bei Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden:  
              kontakt@athrion.de
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy