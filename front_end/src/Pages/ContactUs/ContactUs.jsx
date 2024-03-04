import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com"; 
import login1 from "../../assets/contact-us.jpeg";

function Login() {
  const [message, setMessage] = useState({
    from_name: "", // Adding from_name to the message state
    email: "",
    body: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessage({ ...message, [name]: value });
  };

  const sendMessage = (e) => {
    e.preventDefault();
  
    // Create an object with message data, including the sender's email
    const messageData = {
      to_name: 'Digit Crops', // Replace with the recipient's name
      from_name: message.from_name, // Sender's name from the form input
      email_sender: message.email, // Sender's email from the form input
      message: message.body, // Message content from the form input
    };
  
    // Call EmailJS send function
    emailjs
      .send(
        'service_bvrbsab', // Replace with your service ID
        'template_x0wncxr', // Replace with your template ID
        messageData,
        'GShP0g3d1T_tyUFTj' // Replace with your user ID
      )
      .then((response) => {
        console.log('Email sent successfully:', response);
        toast.success("Message sent successfully!");
        
        // Clear message fields
        setMessage({
          from_name: "", // Clearing from_name
          email: "",
          body: "", // Clearing body
        });
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        toast.error("Message sending failed. Please try again.");
      });
  };

  return (
    <section className="login_page" style={{ alignItems:"flex-start" }}>
      <section className="login-form-section">
        <img
          src={login1}
          className="login-img"
          alt=""
          srcSet={`${login1}  768w, ${login1}  1024w`}
          sizes="(max-width:  768px)  100vw,  1024px"
        />

        <form className="login-form" onSubmit={sendMessage}>
          <h1 className="login-header">Send Us a message</h1>
          <label className="login-label">Your Name</label>
          <input
            type="text"
            className="login-input"
            placeholder="Your Name"
            name="from_name"
            value={message.from_name}
            onChange={handleInputChange}
            required
          />
          <label className="login-label">Email</label>
          <input
            type="email"
            className="login-input"
            placeholder="Email"
            name="email"
            value={message.email}
            onChange={handleInputChange}
            required
          />
          <label className="login-label">Message</label>
          <textarea
            className="login-input"
            placeholder="Message"
            style={{ height: "100px" }}
            name="body"
            value={message.body}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="login-btn">Send Message</button>
        </form>
      </section>
      <ToastContainer />
    </section>
  );
}

export default Login;
