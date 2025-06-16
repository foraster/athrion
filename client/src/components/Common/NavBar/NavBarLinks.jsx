import { NavLink, useNavigate } from "react-router-dom";
import {
  ADMIN_ROUTE,
  CART_ROUTE,
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
} from "../../../utils/consts";
import { ReactComponent as CartIcon } from "../../../assets/icons/shopping-cart.svg";
import { ReactComponent as ProfileIcon } from "../../../assets/icons/profile.svg";

const NavLinks = ({ user, cart, onLinkClick }) => {
  const navigate = useNavigate();
  const totalItems = cart.products.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center">
      {user.user?.role === "ADMIN" && user.isAuth && (
        <NavLink
          to={ADMIN_ROUTE + DASHBOARD_ROUTE}
          onClick={onLinkClick}
          className="px-4 py-1 border border-white rounded transition text-white hover:bg-white hover:text-black hidden md:block"
        >
          Admin Panel
        </NavLink>
      )}
      <NavLink
        to="/"
        onClick={onLinkClick}
        className={({ isActive }) =>
          `hover:underline ${isActive ? "font-semibold" : "text-gray-300"}`
        }
      >
        Startseite
      </NavLink>
      <NavLink
        to="/shop"
        onClick={onLinkClick}
        className={({ isActive }) =>
          `hover:underline ${isActive ? "font-semibold" : "text-gray-300"}`
        }
      >
        Shop
      </NavLink>
      <NavLink
        to="/about"
        onClick={onLinkClick}
        className={({ isActive }) =>
          `hover:underline ${isActive ? "font-semibold" : "text-gray-300"}`
        }
      >
        Über uns
      </NavLink>
      <NavLink
        to="/kontakt"
        onClick={onLinkClick}
        className={({ isActive }) =>
          `hover:underline ${isActive ? "font-semibold" : "text-gray-300"}`
        }
      >
        Kontakt
      </NavLink>

      <NavLink
        to={CART_ROUTE}
        onClick={onLinkClick}
        className={({ isActive }) =>
          `md:px-2 md:py-1 relative hover:bg-white hover:text-black rounded transition hover:underline ${
            isActive ? "font-semibold" : "text-gray-300"
          }`
        }
      >
        <CartIcon className="w-5 h-5 hidden md:block" />
        <span className="block md:hidden">Warenkorb ({totalItems})</span>
        {totalItems > 0 && (
          <span className="hidden md:inline-flex absolute -top-1 -right-0 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 items-center justify-center">
            <p>{totalItems}</p>
          </span>
        )}
      </NavLink>

      {user.isAuth ? (
        <>
          <NavLink
            to={PROFILE_ROUTE}
            onClick={onLinkClick}
            className={({ isActive }) =>
              `md:px-2 md:py-1 hover:underline hover:bg-white hover:text-black rounded hover:underline ${
                isActive ? "font-semibold" : "text-gray-300"
              }`
            }
          >
            <ProfileIcon className="w-5 h-5 hidden md:block" />
            <span className="block md:hidden">Profil</span>
          </NavLink>
        </>
      ) : (
        <button
          onClick={() => {
            navigate(LOGIN_ROUTE);
            onLinkClick?.();
          }}
          className="px-4 py-1 text-left border border-white rounded hover:bg-white hover:text-black"
        >
          Anmelden
        </button>
      )}
    </div>
  );
};

export default NavLinks;
