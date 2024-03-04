import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import google from "../../assets/google.png";
import mobileImage from "../../assets/login-mobile.png";
import login1 from "../../assets/login.jpg";
import instance from "../../api.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post('/auth/login', login);
      console.log(response);
      
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');

    } catch (error) {
      const errorMessage =
        error.response?.data.error || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleGoogleLogin =async () => {
    try {
      const response = await instance.get('/auth/google');
      console.log(response);
      if (response.status === 200) {
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
       ;}

    
  }catch (error) {
console.log(error.response)

  }
}

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="login_page" >
      <section className="login-form-section">
        <img
          src={login1}
          className="login-img"
          alt=""
          srcSet={`${mobileImage}  768w, ${login1}  1024w`}
          sizes="(max-width:  768px)  100vw,  1024px"
        />

        <form className="login-form">
          <h1 className="login-header">Login to your account</h1>
          <label className="login-label">Email</label>
          <input
            type="email"
            className="login-input"
            placeholder="email"
            name="email"
            value={login.email}
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
              value={login.password}
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

          <button className="login-btn" onClick={handleLogin}>Login</button>
          <button type="button" className="login-btn" id="google-btn" onClick={handleGoogleLogin}>
            <img src={google} className="google-img" alt="" />
            <p>Login in with google</p>
          </button>
          <p className="register">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </section>
      <ToastContainer />
    </section>
    
  );
}

export default Login;
