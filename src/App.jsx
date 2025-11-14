import { Route, Routes } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import AuthForm from "./pages/Login";
import Shops from "./pages/ShopsPage";
import Services from "./pages/Services_page";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

import RequestService from "./components/RequestService";
import TrackOrder from "./components/TrackOrder";
import AboutPage from "./pages/AboutPage";
import UserProfile from "./components/user/UserProfile";
import VendorDashboard from "./components/vendor/VendorDashboard";
import UserNotificationPanel from "./components/UserNotificationTab";
import MyOrders from "./components/MyOrders";
import Admin from "./components/admin/Admin";
import ServiceInput from "./components/admin/ServiceInput";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<AuthForm />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/vendor" element={<VendorDashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/serviceinput" element={<ServiceInput />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Landingpage />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/service" element={<Services />} />
          <Route path="/request" element={<RequestService />} />
          <Route path="/track" element={<TrackOrder />} />
          <Route path="/upload" element={<AboutPage />} />
          <Route path="/Allservice" element={<Services />} />
          <Route path="/usernotifi" element={<UserNotificationPanel />} />
          {/* <Route path="/myorders" element={<MyOrders />} /> */}
        </Route>
      </Routes>
    </>
  );
};
export default App;
