import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Detaile() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/Products/${id}`)
      .then((resp) => setProduct(resp.data))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div>
      <h2>Product Details</h2>
      <img src={product.imageUrl} alt={product.name} />
      <h4>Name: {product.name}</h4>
      <p>Description: {product.description}</p>
      <h4>Price: {product.price} $</h4>
      <h4>Stock: {product.stock}</h4>
    </div>
  );
}

export default Detaile;
