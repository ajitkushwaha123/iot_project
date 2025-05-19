import "./App.css";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./Home/DashboardLayout";
import PackageBooking from "./Pages/Booking/PackageBooking";
import AutoMeasurement from "./Pages/Booking/AutoMeasurement";
import RealTimeTracking from "./Pages/Booking/RealTimeTracking";
import PriceEstimation from "./Pages/Booking/PriceEstimation";
import PaymentIntegration from "./Pages/Booking/PaymentIntegration";
import DeliveryPartners from "./Pages/Booking/DeliveryPartners/DeliveryPartners";
import AllOrders from "./Pages/Order/AllOrders";
import CreateOrder from "./Pages/Order/CreateOrder";
import Hero from "./Home/Hero";
import HomeLayout from "./Home/HomeLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<LoginWithPassword />} />
          <Route path="reset-password" element={<ForgetPassword />} />
        </Route>
        
        <Route path="/" element={<HomeLayout />}>
          <Route path="/" element={<Hero />} />
        </Route>

        <Route path="/" element={<DashboardLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="package-booking" element={<PackageBooking />} />
          <Route path="pricing" element={<AutoMeasurement />} />
          <Route path="tracking" element={<RealTimeTracking />} />
          <Route path="price-estimation" element={<PriceEstimation />} />
          <Route path="payment" element={<PaymentIntegration />} />
          <Route path="partners/manage" element={<DeliveryPartners />} />
          <Route path="order/create-order" element={<CreateOrder />} />
          <Route path="order/all-orders" element={<AllOrders />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
