import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./Auth/Register/Register";
import AuthLayout from "./Auth/AuthLayout";
import LoginWithPassword from "./Auth/Login/LoginWithPassword";
import ForgetPassword from "./Auth/ForgetPassword/ForgetPassword";
import Profile from "./Auth/Profile/Profile";
import Home from "./Home/Home";
import DashboardLayout from "./Home/DashboardLayout";
import PackageBooking from "./Pages/Booking/PackageBooking";
import AutoMeasurement from "./Pages/Booking/AutoMeasurement";
import RealTimeTracking from "./Pages/Booking/RealTimeTracking";
import PriceEstimation from "./Pages/Booking/PriceEstimation";
import PaymentIntegration from "./Pages/Booking/PaymentIntegration";
import DeliveryPartners from "./Pages/Booking/DeliveryPartners/DeliveryPartners";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<LoginWithPassword />} />
          <Route path="reset-password" element={<ForgetPassword />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="package-booking" element={<PackageBooking />} />
          <Route path="pricing" element={<AutoMeasurement />} />
          <Route path="tracking" element={<RealTimeTracking />} />
          <Route path="price-estimation" element={<PriceEstimation />} />
          <Route path="payment" element={<PaymentIntegration />} />
          <Route path="delivery-partners" element={<DeliveryPartners />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
