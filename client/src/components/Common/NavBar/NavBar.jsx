import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import NavBarLinks from "./NavBarLinks";
import BurgerButton from "./BurgerButton";

const NavBar = observer(() => {
  const { user, cart } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold tracking-wide">
          Athrion
        </NavLink>

        {/* Burger button on small screens */}
        <BurgerButton onClick={() => setMenuOpen(!menuOpen)} open={menuOpen} />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-sm uppercase items-center">
          <NavBarLinks
            user={user}
            cart={cart}
            onLinkClick={() => setMenuOpen(false)}
          />
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 px-6 pb-4 flex flex-col items-right text-md uppercase space-y-2">
          <NavBarLinks
            user={user}
            cart={cart}
            onLinkClick={() => setMenuOpen(false)}
          />
        </div>
      )}
    </header>
  );
});

export default NavBar;
