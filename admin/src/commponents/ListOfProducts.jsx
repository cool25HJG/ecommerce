import React from "react";

function ListOfProducts({product}) {
  const [name,setname]=useState("")
  const [description,setdescription]=useState("")
  const [price,setprice]=useState(0)
  const [stock,setstock]=useState(0)
  const [imageUrl,setimageUrl]=useState("")
  const [sellerId,setsellerId]=useState(0)
  const [categoryId,setcategoryId]=useState(0)
  const [show,setshow]=useState(0)
  const toggle =(action)=>{
    if(show === action){
      setshow(0)
    } else {
      setshow(action)
    }

  }
  return (
    <div>
      hello
    </div>
  );
}

export default ListOfProducts;
