import React, { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { CART_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from "../utils/consts";
import { ReactComponent as CartIcon } from "../assets/icons/shopping-cart.svg"
import { ReactComponent as ProfileIcon } from "../assets/icons/profile.svg"

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const { cart } = useContext(Context);

  const totalItems = cart.products.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-black text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* logo */}
        <NavLink to="/" className="text-xl font-bold tracking-wide">
          Athrion
        </NavLink>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-sm uppercase flex items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-semibold" : "text-gray-300"}`
            }
          >
            Startseite
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-semibold" : "text-gray-300"}`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-semibold" : "text-gray-300"}`
            }
          >
            Über uns
          </NavLink>
          <NavLink
            to="/kontakt"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-semibold" : "text-gray-300"}`
            }
          >
            Kontakt
          </NavLink>
          {/* Cart */}
          <NavLink
                to={CART_ROUTE}
                className="rounded px-2 py-1 hover:bg-white hover:text-black transition relative inline-block"
              >
                <CartIcon className="w-5 h-5"/>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-0 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </NavLink>
          {/* Authorization */}
          {user.isAuth ? (
            <div className='flex gap-1"'>
              
              <NavLink
                to={PROFILE_ROUTE}
                className="rounded px-2 py-1 hover:bg-white hover:text-black transition"
              >
                <ProfileIcon className="w-5 h-5"/>
              </NavLink>
            </div>
          ) : (
            <button
              onClick={() => navigate(LOGIN_ROUTE)}
              className="text-sm border border-white rounded px-4 py-1 hover:bg-white hover:text-black transition"
            >
              Anmelden
            </button>
          )}
        </nav>
      </div>
    </header>
  );
});

export default NavBar;
