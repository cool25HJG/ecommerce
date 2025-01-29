import React, { useState } from "react";

export default function Addproduct() {
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [price, setprice] = useState("");
    const [stock, setstock] = useState("");
    const [imageUrl, setimageUrl] = useState("");

    const handleAddproduct = async (product) => {
        try {
          const response = await axios.post("http://localhost:4000/api/Products/",product);
        //   fetch();
        } catch (error) {
          throw error;
        }
      }

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


      <div >
        <button
          onClick={() => handleAddproduct({ name, description, price, stock,imageUrl})}
        >
          Add
        </button>
      </div>
    </div>
  )
}
