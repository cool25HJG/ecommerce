import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Addproduct({ fetch }) {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [categoryId, setCategoryId] = useState(""); // Category Selection
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(import.meta.env.VITE_HOST+"/api/Category/")
            .then((resp) => setCategories(resp.data))
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

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
            setImageUrl(response.data.secure_url);
            setLoading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setMessage('Failed to upload image.');
            setLoading(false);
        }
    };

    const handleAddProduct = async () => {
        if (!categoryId) {
            alert("Please select a category.");
            return;
        }

        try {
            const newProduct = {
                name,
                description,
                price,
                stock,
                imageUrl,
                categoryId
            };

            await axios.post(import.meta.env.VITE_HOST+"/api/Products/", newProduct);
            navigate("/main/seller");
            fetch();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div>
            <h2>Add Product</h2>

            <label>Category</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>

            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

            <label>Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

            <label>Price</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

            <label>Stock</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />

            <label>Image Upload</label>
            <input type="file" onChange={(e) => handleImageUpload(e.target.files[0])} />
            {loading && <p>Uploading...</p>}
            {message && <p>{message}</p>}

            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
}
