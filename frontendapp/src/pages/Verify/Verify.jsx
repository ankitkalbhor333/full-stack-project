import React, { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import "./verify.css";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate=useNavigate();
   const verifyPayment = async () => {
      try {
        const response = await axios.post(
          `${url}/api/order/verify`,{success,orderId}
        );
     if(response.data.success){
      navigate("/myorders");
     }else{
      navigate("/");
     }
      } catch (err) {
        console.error("Error verifying order:", err);
        navigate("/");
      }
    };

  useEffect(() => {
   
    verifyPayment();
  }, []);

  return (
    <div className="verify-container">
      <div className="spinner"></div>
      <p>Verifying your payment, please wait...</p>
    </div>
  );
};

export default Verify;
