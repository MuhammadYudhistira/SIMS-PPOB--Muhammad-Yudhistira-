import Homepage from "../modules/Homepage";
import LoginPage from "../modules/auth/LoginPage";
import ProfilePage from "../modules/profile/ProfilePage";
import TopUpPage from "../modules/transaction/TopUpPage";
import TransactionDetailPage from "../modules/transaction/TransactionDetailPage";
import TransactionsPage from "../modules/transaction/TransactionsPage";
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
      {
        key: "profile",
        name: "profile",
        path: "/profile",
        requireAuth: true,
        Component: ProfilePage,
      },
      {
        key: "transaction",
        name: "transaction",
        path: "/transactions",
        requireAuth: true,
        Component: TransactionsPage,
      },
      {
        key: "transaction-detail",
        name: "transaction-detail",
        path: "/transactions/:code",
        requireAuth: true,
        Component: TransactionDetailPage,
      },
      {
        key: "transaction",
        name: "transaction",
        path: "/top-up",
        requireAuth: true,
        Component: TopUpPage,
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