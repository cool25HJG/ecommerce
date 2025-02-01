import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

function Updateproduct({ fetch }) {
    const navigate = useNavigate();
    const { state } = useLocation();
    const product = state?.product;

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState(product?.name || "");
    const [description, setDescription] = useState(product?.description || "");
    const [price, setPrice] = useState(product?.price || "");
    const [stock, setStock] = useState(product?.stock || "");
    const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
    const [categoryId, setCategoryId] = useState(product?.categoryId || ""); // Ensure correct category
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(import.meta.env.VITE_HOST+"/api/Category/")
            .then((resp) => setCategories(resp.data))
            .catch((error) => console.error("Error fetching categories:", error));

        // ✅ Set categoryId correctly when component loads
        if (product?.categoryId) {
            setCategoryId(product.categoryId);
        }
    }, [product]);

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

    const handleUpdateProduct = async () => {
        if (!categoryId) {
            alert("Please select a category.");
            return;
        }

        const updatedProduct = {
            name,
            description,
            price,
            stock,
            imageUrl,
            categoryId: Number(categoryId), // ✅ Convert to number
        };

        console.log("Updating product with:", updatedProduct); // ✅ Debugging

        try {
            await axios.put(import.meta.env.VITE_HOST+`/api/Products/${product.id}`, updatedProduct);
            navigate("/main/seller");
            fetch();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="update-product-container">
            <h2 className="update-product-title">Update Product</h2>
            
            <div className="update-product-form">
             

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
                    <select value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))}>
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
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
                        {imageUrl && <img src={imageUrl} alt="Preview" className="image-preview" />}
                    </div>
                </div>

                {loading && <p className="loading-message">Uploading image...</p>}
                {message && <p className="error-message">{message}</p>}

                <button 
                    className="update-product-button"
                    onClick={handleUpdateProduct}
                    disabled={loading || !name || !description || !price || !stock || !imageUrl || !categoryId}
                >
                    Update Product
                </button>
            </div>
        </div>
    );
}

export default Updateproduct;
