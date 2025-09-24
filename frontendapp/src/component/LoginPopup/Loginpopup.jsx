import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { assets } from "../../assets/asset.js";
import "./Loginpopup.css";
import { StoreContext } from "../../context/StoreContext.jsx";
import { useNavigate } from "react-router-dom";

const Loginpopup = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onLogin = async (e) => {
    e.preventDefault();
    console.log("final data ", data);

    let newurl = url;
    if (currState === "Login") {
      newurl += "/api/user/login";
    } else {
      newurl += "/api/user/register";
    }

    try {
      const response = await axios.post(newurl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);

        setShowLogin(false);
        navigate("/profile");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during login/signup:", error);
      alert("Something went wrong. Please try again.");
    }
  };
// Example after login response


  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        {/* Title & Close */}
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.crossicon}
            alt="Close"
            className="close-icon"
          />
        </div>

        {/* Inputs */}
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Email"
            required
          />
          <input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        {/* Button */}
        <button type="submit">
          {currState === "Sign-up" ? "Create Account" : "Login"}
        </button>

        {/* Terms & Conditions */}
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            By continuing, I agree to the <span>Terms & Conditions</span>.
          </p>
        </div>

        {/* Toggle Login/Signup */}
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign-up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Loginpopup;

