import React, { useState } from "react";
import axios from 'axios';
import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";
import { Image } from 'cloudinary-react';

function Updateproduct({ fetch }) {
    const navigate = useNavigate();
    const { state } = useLocation();
    const product = state?.product;

    const [name, setname] = useState(product?.name || "");
    const [description, setdescription] = useState(product?.description || "");
    const [price, setprice] = useState(product?.price || "");
    const [stock, setstock] = useState(product?.stock || "");
    const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleImageUpload = async (file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Ghassen123'); // Replace with your Cloudinary upload preset
        formData.append('cloud_name', 'dqh6arave'); // Replace with your Cloudinary cloud name

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dqh6arave/image/upload',
                formData
            );
            const imageUrl = response.data.secure_url;
            setImageUrl(imageUrl);
            setLoading(false);
        } catch (error) {
            console.error('Error uploading image: ', error);
            setMessage('Failed to upload image.');
            setLoading(false);
        }
    };

    const handleUpdateProduct = async () => {
        try {
            const updatedProduct = {
                name,
                description,
                price,
                stock,
                imageUrl
            };

            const response = await axios.put(`http://localhost:4000/api/Products/${product.id}`, updatedProduct);
            navigate("/main/seller");
            fetch();
        } catch (error) {
            console.error("Error updating product: ", error);
        }
    };

    return (
        <div className="container">
            
            <div className="main-content">
                <div className="profile-container">
                <h1 style={{textAlign:"center",marginBottom:"20px"}}> Update Product</h1>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setname(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input type="text" value={description} onChange={(e) => setdescription(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input type="number" value={price} onChange={(e) => setprice(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Stock</label>
                    <input type="number" value={stock} onChange={(e) => setstock(e.target.value)} />
                </div>

                <div  className="form-group" style={{marginBottom:"10px"}}>
                    <label>Current Image</label>
                    {imageUrl && <Image   cloudName="your_cloud_name" publicId={imageUrl} width="150" />}
                </div>

                <div className="form-group">
                    <label>New Image</label>
                    <input type="file" onChange={(e) => handleImageUpload(e.target.files[0])} />
                    {loading ? <p>Uploading...</p> : null}
                    {message ? <p>{message}</p> : null}
                </div>

                <div className="product-actions">
                    <button   onClick={handleUpdateProduct}>Update Product</button>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Updateproduct;
