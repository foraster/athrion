import {
  DASHBOARD_ROUTE,
  PRODUCTS_ROUTE,
  ADD_PRODUCT_ROUTE,
  EDIT_PRODUCT_ROUTE,
  ORDERS_ROUTE,
  CART_ROUTE,
  SHOP_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  PRODUCT_ROUTE,
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  PRIVACY_ROUTE,
  IMPRESSUM_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
  USERS_ROUTE,
  CHECKOUT_ROUTE,
  ORDER_DETAILS_ROUTE,
  ADMIN_ROUTE,
} from "./utils/consts";
import Cart from "./pages/ShoppingCart";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import ProductPage from "./pages/ProductPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Impressum from "./pages/Impressum";
import Profile from "./pages/Profile";
import Dashboard from "./components/Admin/Dashboard";
import OrderList from "./components/Admin/OrderList";
import ProductForm from "./components/Admin/ProductForm";
import ProductListAdmin from "./components/Admin/ProductListAdmin";
import Settings from "./components/Admin/Settings";
import UserList from "./components/Admin/UserList";
import CheckoutPage from "./pages/CheckoutPage";
import OrderDetails from "./pages/OrderDetails";
import Admin from "./pages/Admin";

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: DASHBOARD_ROUTE,
    Component: Dashboard,
  },
  {
    path: USERS_ROUTE,
    Component: UserList,
  },
  {
    path: PRODUCTS_ROUTE,
    Component: ProductListAdmin,
  },
  {
    path: ADD_PRODUCT_ROUTE,
    Component: ProductForm,
  },
  {
    path: EDIT_PRODUCT_ROUTE,
    Component: ProductForm,
  },
  {
    path: ORDERS_ROUTE,
    Component: OrderList,
  },
  {
    path: SETTINGS_ROUTE,
    Component: Settings,
  },
  
];

export const authRoutes = [
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
  {
    path: ORDER_DETAILS_ROUTE,
    Component: OrderDetails,
  }
];

export const publicRoutes = [
  {
    path: CART_ROUTE,
    Component: Cart,
  },
  {
    path: HOME_ROUTE,
    Component: Home,
  },
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: ABOUT_ROUTE,
    Component: About,
  },
  {
    path: CONTACT_ROUTE,
    Component: Contact,
  },
  {
    path: PRIVACY_ROUTE,
    Component: Privacy,
  },
  {
    path: IMPRESSUM_ROUTE,
    Component: Impressum,
  },
  {
    path: PRODUCT_ROUTE + "/:id",
    Component: ProductPage,
  },
  {
    path: CHECKOUT_ROUTE,
    Component: CheckoutPage,
  },
];
