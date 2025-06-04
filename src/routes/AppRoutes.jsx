import Homepage from "../modules/Homepage";
import LoginPage from "../modules/auth/LoginPage";
import MainLayout from "../ui/layouts/MainLayout";


const AppRoutes = [
  {
    name: "main",
    path: "/",
    Component: MainLayout,
    key: "main",
    routes: [
      {
        key: "home",
        name: "home",
        path: "/",
        index: true,
        requireAuth: true,
        Component: Homepage,
      },
    ],
  },
  {
    key: "login",
    path: "/login",
    name: "login",
    requireAuth: false,
    Component: LoginPage,
  },
  {
    name: "404",
    path: "*",
    Component: () => <p>this content 404 page</p>,
    key: "404",
  },
];
export default AppRoutes;