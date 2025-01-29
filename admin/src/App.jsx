import { useEffect, useState } from "react";
import "./App.css";
import ListOfProducts from "./commponents/ListOfProducts";
import ListOfUsers from "./commponents/ListOfUsers";
import Navbar from "./commponents/Navbar.jsx";
import Sidebar from "./commponents/Sidebar.jsx";
import axios from "axios"
function App() {
  const [View, setView] = useState("product");
  const [users,setusers] = useState([])
  const changeView = (view) => {
    setView(view);
  };
  const fetchUsers = ()=>{
  axios.get("http://localhost:4000/api/user")
  .then((res)=>{setusers(res.data)})
  }
  const DeleteUser = (id)=>{
    axios.delete(`http://localhost:4000/api/user/${id}`)
    .then(()=>{console.log("deleted")
    })
    .catch((err)=>{console.err("err delete",err)})
  }
  useEffect(()=>{
    fetchUsers()
  },[])
  
  return (
    <div>
     <Navbar changeView={changeView} />
      <Sidebar changeView={changeView} />
      
      <div className="viewdiv">
      {View === "product" ? <ListOfProducts /> : <ListOfUsers  users={users}  DeleteUser={DeleteUser} />}</div>
    </div>
  );
}

export default App;
