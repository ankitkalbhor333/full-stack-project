import React, { useState, useEffect } from "react";
import "./profileform.css";

const ProfileForm = () => {
  // Load saved profile from localStorage or use empty defaults
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("profile");
    return saved
      ? JSON.parse(saved)
      : {
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          city: "",
          state: "",
          zipcode: "",
          country: "",
        };
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("profile", JSON.stringify(formData));
    alert("Profile saved!");
  };

  return (
    <div className="profile-form-container">
      <h2>My Profile</h2>
      <form className="profile-form" onSubmit={handleSave}>
        <div className="multifield">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={formData.street}
          onChange={handleChange}
          required
        />

        <div className="multifield">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="multifield">
          <input
            type="text"
            name="zipcode"
            placeholder="Zip Code"
            value={formData.zipcode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;
