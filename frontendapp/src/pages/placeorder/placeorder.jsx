import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import './placeholder.css';

const Placeorder = () => {
  const { getTotalCartamount, cartItems, token ,url } = useContext(StoreContext);
  
  const navigate = useNavigate();
 const { food_list } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
 
//     let orderItems=[];
//     food_list.map((item)=>{
//       if(cartItems[item._id]>0){
//        let itemInfo = { ...item, quantity: cartItems[item._id] };
// orderItems.push(itemInfo);

//       }
//     })
//     console.log(orderItems);
    
//     let orderData={
//       userId: localStorage.getItem("userId"),
//       items:orderItems,
//       amount:getTotalCartamount()+2,
//       address:data,
//     }
//     console.log("Order Data to send:", orderData);

//     let response=await axios.post(url+"/api/order/place",orderData,{headers:{Authorization:`  Bearer ${token}`}});
//     if(response.data.success && response.data.url){
//      const {url: stripeUrl} = response.data.url;
// window.location.replace(stripeUrl);

//     }
//    else{
//     alert("error placing order")
//    }
//     }

   const handleSubmit = async (e) => {
  e.preventDefault();

  const orderItems = food_list
    .filter(item => cartItems[item._id] > 0)
    .map(item => ({ ...item, quantity: cartItems[item._id] }));

  if (orderItems.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const orderData = {
    userId: localStorage.getItem("userId"),
    items: orderItems,
    amount: getTotalCartamount() + 2,
    address: data,
  };

  try {
    const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success && response.data.url) {
      window.location.href = response.data.url; // safer than replace
    } else {
      alert("Error placing order");
    }
  } catch (error) {
    console.error("Order error:", error);
    alert("Something went wrong. Check console.");
  }
};


  
  const subtotal = getTotalCartamount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    console.log(data);
    if(!token){
      navigate("/cart");
    } else if(getTotalCartamount()===0){
      navigate("/cart");
    }
  }, [data]);
  
  return (
    <div>
      <form  className="place-order" onSubmit={handleSubmit}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multifield">
            <input required type="text" name='firstName' value={data.firstName} onChange={onChangeHandler} placeholder='First Name' />
            <input type="text" name='lastName' value={data.lastName} onChange={onChangeHandler} placeholder='Last Name' />
            <input type="text" name='email' value={data.email} onChange={onChangeHandler} placeholder='Email' />
          </div>
          <input type="text" name='street' value={data.street} onChange={onChangeHandler} placeholder='Street' />
          <div className="multifield">
            <input type="text" name='city' value={data.city} onChange={onChangeHandler} placeholder='City' />
            <input type="text" name='state' value={data.state} onChange={onChangeHandler} placeholder='State' />
          </div>
          <div className="multifield">
            <input type="text" name='zipcode' value={data.zipcode} onChange={onChangeHandler} placeholder='Zipcode' />
            <input type="text" name='country' value={data.country} onChange={onChangeHandler} placeholder='Country' />
            <input type="text" name='phone' value={data.phone} onChange={onChangeHandler} placeholder='Phone' />
          </div>
          <div className='buttons'>
            <button type="submit">Proceed to Payment</button>
          </div>
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div className="cart-detail">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <hr />
            <div className="cart-detail">
              <p>Delivery Fee</p>
              <p>${deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-detail">
              <b>Total</b>
              <b>${total}</b>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Placeorder;
