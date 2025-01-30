import { useEffect, useState } from "react";
import "./App.css";
import ListOfProducts from "./commponents/ListOfProducts";
import ListOfUsers from "./commponents/ListOfUsers";
import ListOfCategory from "./commponents/ListOfCategory.jsx";
import Navbar from "./commponents/Navbar.jsx";
import Sidebar from "./commponents/Sidebar.jsx";
import axios from "axios"
function App() {
  const [View, setView] = useState("product");
  const [users,setusers] = useState([])
  const [product,setproduct] = useState([])
  const [category,setcategory] =useState([])
  const changeView = (view) => {
    setView(view);
  };
  const fetchUsers = ()=>{
  axios.get("http://localhost:4000/api/user")
  .then((res)=>{setusers(res.data)})
  .catch((err)=>console.error("err fetching user",err))
  }
  const fetchProducts = ()=>{
    axios.get("http://localhost:4000/api/Products")
    .then((res)=>{setproduct(res.data)})
  .catch((err)=>console.error("err fetching product",err))
  }
  const fetchCategory = ()=>{
    axios.get("http://localhost:4000/api/Category")
    .then((res)=>{setcategory(res.data)})
  .catch((err)=>console.error("err fetching category",err))
  }

  const DeleteUser = (id)=>{
    axios.delete(`http://localhost:4000/api/user/${id}`)
    .then(()=>{console.log("deleted")
    })
    .catch((err)=>{console.err("err delete",err)})
  }
  const DeleteProducts = (id)=>{
    axios.delete(`http://localhost:4000/api/Products/${id}`)
    .then(()=>{console.log("deleted")
    })
    .catch((err)=>{console.err("err delete",err)})
  }
  const DeleteCategory = (id)=>{
    axios.delete(`http://localhost:4000/api/Category/${id}`)
    .then(()=>{console.log("deleted")
    })
    .catch((err)=>{console.err("err delete",err)})
  }
 
  const updateUser = (id,body)=>{
    axios.put(`http://localhost:4000/api/user/${id}`,body)
    .then(()=>console.log("updated"))
    .catch((err)=>console.error("err updating",err))
  }
  const updateProducts = (id,body)=>{
    axios.put(`http://localhost:4000/api/Products/${id}`,body)
    .then(()=>console.log("updated"))
    .catch((err)=>console.error("err updating",err))
  }
  const updateCategory = (id,body)=>{
    axios.put(`http://localhost:4000/api/Category/${id}`,body)
    .then(()=>console.log("updated"))
    .catch((err)=>console.error("err updating",err))
  }
  const addCategory = (body)=>{
    axios.post("http://localhost:4000/api/Category",body)
    .then(()=>console.log("added"))
    .catch((err)=>console.log("error adding cat"))
  }
  useEffect(()=>{
    fetchUsers()
    fetchProducts()
    fetchCategory()
  },[])
  return (
    <div>
     <Navbar changeView={changeView} />
      <Sidebar changeView={changeView} />
      
      <div className="viewdiv">
      {View === "product" ? <ListOfProducts updateProducts={updateProducts} DeleteProducts={DeleteProducts} product={product} /> : View === "user" ?<ListOfUsers  updateUser={updateUser} users={users}  DeleteUser={DeleteUser} />: <ListOfCategory category={category}   updateCategory={updateCategory} DeleteCategory={DeleteCategory} addCategory={addCategory} />}</div>
    </div>
  );
}

export default App;
