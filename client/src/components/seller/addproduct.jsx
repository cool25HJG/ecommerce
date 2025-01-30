import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { CloudinaryContext,Image } from 'cloudinary-react';


export default function Addproduct({ fetch }) {
    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [price, setprice] = useState("");
    const [stock, setstock] = useState("");
    const [imageUrl, setimageUrl] = useState(null); // State to hold the image file

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_cloudinary_upload_preset"); // Replace with your upload preset

        try {
            const response = await axios.post(
                "http://localhost:4000/api/Products/",
                formData
            );
            const imageUrl = response.data.secure_url;
            setimageUrl(imageUrl);
        } catch (error) {
            console.error("Error uploading image: ", error);
        }
    };

    const handleAddproduct = async () => {
        const product = { name, description, price, stock, imageUrl };

        try {
            const response = await axios.post("http://localhost:4000/api/Products/", product);
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
                <input type="text" onChange={(e) => setname(e.target.value)} />
            </div>

            <div>
                <label>Description</label>
                <input type="text" onChange={(e) => setdescription(e.target.value)} />
            </div>

            <div>
                <label>Price</label>
                <input type="number" onChange={(e) => setprice(e.target.value)} />
            </div>

            <div>
                <label>Stock</label>
                <input type="number" onChange={(e) => setstock(e.target.value)} />
            </div>

            <div>
                <label>Image Upload</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {imageUrl && (
                    <div>
                        <Image cloudName="your_cloud_name" publicId={imageUrl} width="300" />
                    </div>
                )}
            </div>

            <div>
                <button onClick={handleAddproduct}>Add Product</button>
            </div>
        </div>
    );
}
