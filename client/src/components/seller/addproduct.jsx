import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Image } from 'cloudinary-react';

export default function Addproduct({ fetch }) {
    const navigate = useNavigate();
    const [newProduct, setNewProduct] = useState({
      name: '',
      price: '',
      quantity: '',
      imageUrl: '',
      description: '',
    });
    const [imageUrl, setImage] = useState('');
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
                <input type="text" value={newProduct.name} onChange={(e) => setname(e.target.value)} />
            </div>

            <div>
                <label>Description</label>
                <input type="text" value={newProduct.description} onChange={(e) => setdescription(e.target.value)} />
            </div>

            <div>
                <label>Price</label>
                <input type="number" value={newProduct.price} onChange={(e) => setprice(e.target.value)} />
            </div>

            <div>
                <label>Stock</label>
                <input type="number" value={newProduct.stock} onChange={(e) => setstock(e.target.value)} />
            </div>

            <div className="form-group mb-3">
          <label htmlFor="image">Product Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          {loading && <div className="spinner-border text-primary mt-2" role="status">
            <span className="sr-only">Loading...</span>
          </div>}
        </div>

            <div>
                <button onClick={handleAddproduct}>Add Product</button>
            </div>
        </div>
    );
}
