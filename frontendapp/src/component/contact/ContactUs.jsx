import React, { useState } from "react";
import "./contactus.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p className="contact-description">
        We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            placeholder="Write your message"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit">Send Message</button>
      </form>

      <div className="contact-info">
        <h3>Our Contact Info</h3>
        <p>📍 123 Food Street, Indore, India</p>
        <p>📧 contact@fooddelivery.com</p>
        <p>📞 +91 8817457938</p>
      </div>
    </div>
  );
};

export default ContactUs;
