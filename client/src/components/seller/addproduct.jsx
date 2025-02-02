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
    const [categoryId, setCategoryId] = useState("");
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
            setMessage("Please select a category.");
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
            setMessage("Failed to add product. Please try again.");
        }
    };

    return (
        <div className="add-product-container">
            <h2 className="add-product-title">Add New Product</h2>
            
            <div className="add-product-form">
             

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Stock</label>
                    <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
                </div>

                <div className="form-group">
                    <div className="image-upload-container">
                        <label className="upload-label">
                            {imageUrl ? 'Change Image' : 'Upload Product Image'}
                            <input 
                                type="file" 
                                onChange={(e) => handleImageUpload(e.target.files[0])}
                                accept="image/*"
                            />
                        </label>
                        {imageUrl && <img src={imageUrl} alt="Preview" style={{ maxWidth: '200px' }} />}
                    </div>
                </div>

                {loading && <p className="loading-message">Uploading image...</p>}
                {message && <p className="error-message">{message}</p>}

                <button 
                    className="add-product-button"
                    onClick={handleAddProduct}
                    disabled={loading || !name || !description || !price || !stock || !imageUrl || !categoryId}
                >
                    Add Product
                </button>
            </div>
        </div>
    );
}
