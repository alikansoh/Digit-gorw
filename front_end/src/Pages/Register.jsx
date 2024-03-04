import React, { useState } from "react";
import "./Login/Login.css"; // Adjust the CSS file name if necessary
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import google from "../assets/google.png";
import mobileImage from "../assets/login-mobile.png";
import login1 from "../assets/login.jpg";
import instance from "../api.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
 const [register, setRegister] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
 });

 const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
 };

 const navigate = useNavigate();

 const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post('api/user/register', register);
      console.log(response);
      
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
      sessionStorage.setItem('token', response.data.token); 
      navigate('/');

    } catch (error) {
      const errorMessage =
        error.response?.data.error || "Registration failed. Please try again.";
      toast.error(errorMessage);
    }
 };

 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);

 const handleShowPassword = () => {
    setShowPassword(!showPassword);
 };

 const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
 };

 return (
    <section className="login_page">
      <section className="login-form-section" style={{height:"1000px", marginTop:"100px",justifyContent:"center"}}>
        {/* <img
          src={login1}
          className="login-img"
          alt=""
          srcSet={`${mobileImage} 768w, ${login1} 1024w`}
          sizes="(max-width: 768px) 100vw, 1024px"
        /> */}

        <form className="login-form"style={{}}>
          <h1 className="login-header">Register a new account</h1>
          <label className="login-label">First Name</label>
          <input
            type="text"
            className="login-input"
            placeholder="First Name"
            name="firstName"
            value={register.firstName}
            onChange={handleInputChange}
            required
          />
          <label className="login-label">Last Name</label>
          <input
            type="text"
            className="login-input"
            placeholder="Last Name"
            name="lastName"
            value={register.lastName}
            onChange={handleInputChange}
            required
          />
          <label className="login-label">Email</label>
          <input
            type="email"
            className="login-input"
            placeholder="Email"
            name="email"
            value={register.email}
            onChange={handleInputChange}
            required
          />
          <label className="login-label">Phone</label>
          <input
            type="tel"
            className="login-input"
            placeholder="Phone"
            name="phone"
            value={register.phone}
            onChange={handleInputChange}
            required
          />
          <label className="login-label">Password</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              className="login-input"
              placeholder="Password"
              name="password"
              value={register.password}
              onChange={handleInputChange}
              required
            />
            <span
              className="password-visibility-toggle"
              onClick={handleShowPassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <label className="login-label">Confirm Password</label>
          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="login-input"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={register.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <span
              className="password-visibility-toggle"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button className="login-btn" onClick={handleRegister}>Register</button>
          <p className="register">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </section>
      <ToastContainer />
    </section>
 );
}

export default Register;
