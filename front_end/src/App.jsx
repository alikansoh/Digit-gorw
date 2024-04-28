import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar"; // Import the Navbar component
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Pages/Dashborad/Dashboard";
import OurServices from "./Pages/Dashborad/OurServices";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Pages/Home/Home.css";
import Service from "./Pages/Services/Service";
import Order from "./Pages/Services/Order";
import ContactUs from "./Pages/ContactUs/ContactUs";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Register from "./Pages/Register";
import Footer from "./Components/Footer";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Navbar />
              <Service />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ContactUs"
          element={
            <>
              <Navbar />
              <ContactUs />
              <Footer />
            </>
          }
        />
        <Route
          path="/AboutUs"
          element={
            <>
              <Navbar />
              <AboutUs />
              <Footer />
            </>
          }
        />
        <Route
          path="/orders/:userId"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ourservices"
          element={
            <ProtectedRoute>
              <OurServices />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
