import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE, PRIVACY_ROUTE, IMPRESSUM_ROUTE } from "../utils/consts";
import { registration, login } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import NotifyModal from "../components/Modals/NotifyModal";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isNewsletter, setIsNewsletter] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const auth = async () => {
    try {
      if (!isValidEmail(email)) {
        setMessage("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        setShowModal(true);
        return;
      }
      if (!isLogin) {
        if (!firstName.trim() || !lastName.trim()) {
          setMessage("Vorname und Nachname sind erforderlich.");
          setShowModal(true);
          return;
        }
        if (password.length < 8) {
          setMessage("Das Passwort muss mindestens 8 Zeichen lang sein.");
          setShowModal(true);
          return;
        }
        if (password !== secondPassword) {
          setMessage("Die Passwörter stimmen nicht überein.");
          setShowModal(true);
          return;
        }
        if (!isAgreed) {
          setMessage("Bitte stimmen Sie den Nutz- sowie Datenschutzbedigungen zu.");
          setShowModal(true);
          return;
        }
        await registration(email, password, firstName, lastName, isNewsletter);
      } else {
        await login(email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      navigate(HOME_ROUTE);
    } catch (e) {
  const code = e.response?.data?.code;
  const fallbackMessage = e.response?.data?.message || "Unbekannter Fehler.";

  let localizedMessage;

  switch (code) {
    case "USER_ALREADY_EXISTS":
      localizedMessage = "Ein Benutzer mit dieser E-Mail existiert bereits.";
      break;
    case "INVALID_PASSWORD":
      localizedMessage = "Das eingegebene Passwort ist nicht korrekt.";
      break;
    case "USER_NOT_FOUND":
      localizedMessage = "Kein Benutzer mit dieser E-Mail wurde gefunden.";
      break;
    case "MISSING_REQUIRED_FIELDS":
      localizedMessage = "Bitte füllen Sie alle Pflichtfelder aus.";
      break;
    case "INTERNAL_ERROR":
      localizedMessage = "Ein interner Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
      break;
    default:
      localizedMessage = fallbackMessage;
  }

  setMessage(localizedMessage);
  setShowModal(true);
}
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start px-6 py-16">
      {showModal && (
        <NotifyModal
          message={message}
          setShowModal={setShowModal}
          type="error"
        />
      )}

      <div className="w-full max-w-3xl flex flex-col gap-6">
        {/* Logo */}
        <NavLink to="/" className="text-3xl font-bold tracking-wide mb-4">
          Athrion
        </NavLink>

        {/* Title */}
        <h2 className="text-2xl font-semibold">
          {isLogin ? "Anmeldung" : "Registrierung"}
        </h2>

        {/* Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4"
        >
          {!isLogin && (
            <div className="flex">
              <input
                type="text"
                placeholder="Vorname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 mr-2 rounded border border-neutral-700 bg-black text-white placeholder-gray-500"
              />
              <input
                type="text"
                placeholder="Nachname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 ml-2 rounded border border-neutral-700 bg-black text-white placeholder-gray-500"
              />
            </div>
          )}
          <input
            type="email"
            placeholder="E-Mail-Adresse"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded border border-neutral-700 bg-black text-white placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded border border-neutral-700 bg-black text-white placeholder-gray-500"
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Passwort bestätigen"
              value={secondPassword}
              onChange={(e) => setSecondPassword(e.target.value)}
              className="w-full px-4 py-3 rounded border border-neutral-700 bg-black text-white placeholder-gray-500"
            />
          )}
          {!isLogin ? (<div className="flex flex-col">
            <div className="items-center py-1">
              <input type="checkbox" className="w-4 h-4  mr-2 accent-red-500" checked={isAgreed} onChange={(e) => {setIsAgreed(e.target.checked)}}/>
              <label className="">
                Hiermit stimme ich den{" "}
                <NavLink to={PRIVACY_ROUTE}
                className="underline">Datenschutzbestimmungen</NavLink> und{" "}
                <NavLink to={IMPRESSUM_ROUTE}
                 className=" underline">Nutzbedigungen</NavLink> zu *
              </label>
            </div>
            <div className="items-center py-1">
              <input type="checkbox" className="w-4 h-4 mr-2 accent-red-500" checked={isNewsletter} onChange={(e) => {setIsNewsletter(e.target.checked)}}/>
              <label className="">
                Ich möchte den Newsletter von Athrion zu den Aktionen und neue Angebote bekommen (optional)
              </label>
            </div>
          </div>) : (<div>
            <input type="checkbox" className="w-4 h-4 mr-2 accent-red-500" checked={rememberMe} onChange={(e) => {setRememberMe(e.target.checked)}}/>
              <label className="">
                Angemeldet bleiben
              </label>
          </div>)}
          <button
            type="submit"
            onClick={auth}
            className="mt-2 w-full bg-white text-black py-3 rounded font-semibold hover:bg-gray-200 transition"
          >
            {isLogin ? "Einloggen" : "Registrieren"}
          </button>
        </form>

        {/* Bottom switch */}
        <p className="text-sm text-gray-400">
          {isLogin ? (
            <>
              Noch kein Konto?{" "}
              <NavLink
                to={REGISTRATION_ROUTE}
                className="text-red-500 hover:underline"
              >
                Registrieren
              </NavLink>
            </>
          ) : (
            <>
              Bereits registriert?{" "}
              <NavLink
                to={LOGIN_ROUTE}
                className="text-red-500 hover:underline"
              >
                Anmelden
              </NavLink>
            </>
          )}
        </p>
      </div>
    </div>
  );
});

export default Auth;