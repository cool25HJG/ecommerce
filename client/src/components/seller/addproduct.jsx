import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Image } from 'cloudinary-react';



export default function Addproduct({fetch}) {
    const navigate=useNavigate()
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [price, setprice] = useState("");
    const [stock, setstock] = useState("");
    const [imageUrl, setimageUrl] = useState("");
    const [isFavorite,setIsFavorite]=useState(false)
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const setImageFile = async (file) => {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'Ghassen123');
      formData.append('cloud_name', 'dqh6arave');
      try {
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/dqh6arave/image/upload',

          formData
        );
        
        const imageUrl = res.data.secure_url;
        setImage(imageUrl);
        setNewProduct((prevProduct) => ({
          ...prevProduct,
          imageUrl: imageUrl, 
        }));
        setLoading(false);
      } catch (error) {
        console.log(error);
        
        console.error(error);
        setMessage('Failed to upload image.');
        setLoading(false);
      }
    };
  
    const handleAddproduct = async () => {

      try {
          const response = await axios.post("http://localhost:4000/api/Products/", newProduct);
          navigate("/main/seller");
          fetch();
      } catch (error) {
          console.error("Error adding product: ", error);
      }
  };
    return (
      <div>
      <div>
         <label>Name</label>
        <input onChange={(e) => setname(e.target.value)}/>
      </div>

      <div>
         <label>description</label>
        <input onChange={(e) => setdescription(e.target.value)}/>
      </div>

      <div>
         <label>price</label>
        <input onChange={(e) => setprice(e.target.value)}/>
      </div>

      <div>
         <label>stock</label>
        <input onChange={(e) => setstock(e.target.value)}/>
      </div>

      <div>
         <label>imageUrl</label>
        <input onChange={(e) => setimageUrl(e.target.value)}/>
      </div>
      <div>
         <label>favorite</label>
        <input onChange={(e) => setIsFavorite(e.target.value)}/>
      </div>


    <div >
      <button
        onClick={() => handleAddproduct({ name, description, price, stock,imageUrl,isFavorite})}
      >
        Add
      </button>
    </div>
  </div>
  )
}
