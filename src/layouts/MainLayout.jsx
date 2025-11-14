import { Outlet } from "react-router-dom";
import OneClickGovNavbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <OneClickGovNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
