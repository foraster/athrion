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
  IMPORT_ROUTE,
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
import OrderList from "./components/Admin/OrderListAdmin";
import ProductForm from "./components/Admin/ProductForm";
import ProductListAdmin from "./components/Admin/ProductListAdmin";
import Settings from "./components/Admin/AdminSettings";
import UserList from "./components/Admin/UserList";
import CheckoutPage from "./pages/CheckoutPage";
import OrderDetails from "./pages/OrderDetails";
import Admin from "./pages/Admin";
import AdminSettings from "./components/Admin/AdminSettings";
import SettingsProfile from "./components/Admin/Settings/SettingsProfile ";
import SettingsGeneral from "./components/Admin/Settings/SettingsGeneral";
import SettingsPayments from "./components/Admin/Settings/SettingsPayments ";
import SettingsShipping from "./components/Admin/Settings/SettingsShipping";
import SettingsEmails from "./components/Admin/Settings/SettingsEmails";
import SettingsSecurity from "./components/Admin/Settings/SettingsSecurity";
import ProductImportPreview from "./components/Admin/ProductImportPreview";

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
    path: PRODUCTS_ROUTE + IMPORT_ROUTE,
    Component: ProductImportPreview,
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
    {
    path: ADMIN_ROUTE + SETTINGS_ROUTE,
    Component: AdminSettings,
  },
  {
    path: SETTINGS_ROUTE + "/general",
    Component: SettingsGeneral,
  },
  {
    path: SETTINGS_ROUTE + "/profile",
    Component: SettingsProfile,
  },
  {
    path: SETTINGS_ROUTE + "/payments",
    Component: SettingsPayments,
  },
  {
    path: SETTINGS_ROUTE + "/shipping",
    Component: SettingsShipping,
  },
  {
    path: SETTINGS_ROUTE + "/emails",
    Component: SettingsEmails,
  },
  {
    path: SETTINGS_ROUTE + "/security",
    Component: SettingsSecurity,
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
