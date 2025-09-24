import React, { useEffect, useState } from 'react'
import './add.css'
import { assets } from '../../assets/assets' // make sure this exists
import axios from 'axios';
import {toast} from 'react-toastify'

const Add = ({url}) => {
  // const url = "http://localhost:3000";

  const [image, setImage] = useState(null); // store actual file
  const [preview, setPreview] = useState(null); // store preview URL

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "CAKES",
    image: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  // api call
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image); // send actual file

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        // reset state
        setData({
          name: "",
          description: "",
          price: "",
          category: "CAKES",
          image: ""
        });
        setImage(null);
        setPreview(null);
      toast.success(response.data.message  || "product added succesfully")
      alert("product is add")
      } else {
      toast.error("❌ Failed to add product");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      alert("❌ Something went wrong");
    }
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // store file for API
      setPreview(URL.createObjectURL(file)); // store preview
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-img-upload flex-col'>
          <p>Upload image</p>
          <label htmlFor="image">
            {preview ? (
              <img src={preview} alt="Preview" className="preview-img" />
            ) : (
              <img src={assets.upload} alt="Upload" />
            )}
          </label>
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={handleImageChange}
          />
        </div>

        <div className='add-product-name flex-col'>
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name='name'
            placeholder='type here bro!'
          />
        </div>

        <div className='add-product-description flex-col'>
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            cols="30"
            rows="10"
            placeholder='write content here'
          ></textarea>
        </div>

        <div className='add-category-price flex-col'>
          <div className='add-category flex-col'>
            <p>Product category</p>
            <select onChange={onChangeHandler} value={data.category} name="category">
              <option value="CAKES">CAKES</option>
              <option value="SOUP">SOUP</option>
              <option value="paneer salad">Paneer Salad</option>
              <option value="chinese food">Chinese Food</option>
              <option value="potato fry">Potato Fry</option>
              <option value="cheese pasta">Cheese Pasta</option>
              <option value="Dessert">Dessert</option>
              <option value="bread">Bread</option>
              <option value="indianfood">Indianfood</option>

            </select>
          </div>

          <div className='add-price flex-col'>
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name='price'
              placeholder='$200'
            />
          </div>
        </div>

        <button type='submit'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
