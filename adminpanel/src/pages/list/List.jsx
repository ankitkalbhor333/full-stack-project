import React, { useEffect, useState } from 'react'
import './list.css'
import axios from "axios"
import { toast } from 'react-toastify'

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("❌ Failed to load food list");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Server error while fetching list");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });

      if (response.data.success) {
        toast.success(response.data.message || "✅ Food deleted successfully");

        // ✅ Update state instantly (no need to refetch)
        setList((prevList) => prevList.filter((item) => item._id !== foodId));
      } else {
        toast.error(response.data.message || "❌ Failed to delete food");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Server error while deleting food");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>ALL Foods List</p>
      <div className="list-table">
        <div className="list-table-format">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.length > 0 ? (
          list.map((item) => (
            <div key={item._id} className="list-table-format">
              <img
                src={item.image}  // ✅ use item.image
                alt={item.name}
                className="list-image"
                width="50"
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <button onClick={() => removeFood(item._id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No food items found</p>
        )}
      </div>
    </div>
  );
};

export default List;
