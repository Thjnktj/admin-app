import Dashboard from "../pages/Dashboard";
import User from "../pages/User";
import Product from "../pages/Product";
import Category from "../pages/Category";
import Cart from "../pages/Cart";

export const routes = [
  {
    path: "/",
    exact: true,
    component: Dashboard,
    root: "/admin",
  },
  {
    path: "/cart",
    component: Cart,
    root: "/admin",
  },
  {
    path: "/product",
    component: Product,
    root: "/admin",
  },
  {
    path: "/user",
    component: User,
    root: "/admin",
  },
  {
    path: "/category",
    component: Category,
    root: "/admin",
  },
];
