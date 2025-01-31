import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Image } from 'cloudinary-react';

export default function Addproduct({ fetch }) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleImageUpload = async (file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Ghassen123'); 
        formData.append('cloud_name', 'dqh6arave'); 

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

    const handleAddProduct = async () => {
        try {
            const newProduct = {
                name,
                description,
                price,
                stock,
                imageUrl,
                isFavorite
            };

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
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
                <label>Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div>
                <label>Price</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div>
                <label>Stock</label>
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
            </div>

            <div>
                <label>Image Upload</label>
                <input type="file" onChange={(e) => handleImageUpload(e.target.files[0])} />
                {loading ? <p>Uploading...</p> : null}
                {message ? <p>{message}</p> : null}
            </div>

            

            <div>
                <button onClick={handleAddProduct}>Add Product</button>
            </div>
        </div>
    );
}
