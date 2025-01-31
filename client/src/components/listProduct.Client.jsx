// import React, { useEffect, useState } from 'react'
// import { CiHeart, CiUser, CiShoppingCart } from "react-icons/ci";
// import axios from "axios"
// import ReviewList from './ReviewList';
// import ReviewForm from './Reviewform';
// function listProduct() {
//     const [data, setData] = useState([]);
//     const fetchData = () => {
//         axios
//           .get("http://localhost:4000/api/Products/")
//           .then((resp) => setData(resp.data))
//           .catch((error) => console.log(error));
//       };

// useEffect(()=>{fetchData()},[])
// console.log(data);



//   return (
//     <div>
        
//         {data.map((el)=>(
//             <div key={el.id}>
//           <div  className="column">
//             <div style={{border: "2px solid blue", padding: "10px",  marginBottom: "20px", background: "lightblue", padding: "10px" }}  key={""} className="product-card">
//               <img style={{width:"200px"}} src={el.imageUrl} alt="" />
//               <h4>{el.name}</h4>
//               <p>{el.description}</p>
//               <h4>{el.price}</h4>
//               <h4>{el.stock}</h4>
//               <CiShoppingCart size={25} className="me-3" />
//               <CiHeart size={25} className="me-3" />
//               <ReviewList productId={el.id} />
//               <ReviewForm productId={el.id} />
//               </div>
//               </div>  
//               </div>
//             ))}
//     </div>
//   )
// }

// export default listProduct
