import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
const MainLayout = () => {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Outlet />
    </main>
  );
};
export default MainLayout;