import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct({ fetchProducts }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isProductLoading, setIsProductLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_HOST}/api/Products/products/${id}`);
                setProduct(response.data);
                setName(response.data.name);
                setDescription(response.data.description);
                setPrice(response.data.price);
                setStock(response.data.stock);
                setImageUrl(response.data.imageUrl);
                setCategoryId(response.data.categoryId);
            } catch (error) {
                console.error("Error fetching product:", error);
                setMessage("Failed to load product data.");
            } finally {
                setIsProductLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_HOST}/api/Category/`)
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

    const handleUpdateProduct = async () => {
        if (!categoryId) {
            alert("Please select a category.");
            return;
        }

        const updatedProduct = {
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            imageUrl,
            categoryId: parseInt(categoryId),
        };

        try {
            await axios.put(`${import.meta.env.VITE_HOST}/api/Products/${id}`, updatedProduct);
            navigate("/main/seller");
            fetchProducts();
        } catch (error) {
            console.error("Error updating product:", error);
            setMessage("Failed to update product.");
        }
    };

    if (isProductLoading) {
        return <p>Loading product data...</p>;
    }

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
                    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
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

export default UpdateProduct;