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
  const fetch = ()=>{
  axios.get("")
  .then((res)=>{setusers(res.data)})
  }
  useEffect(()=>{
    fetch()
  },[])
  console.log("data",data)
  return (
    <div>
     <Navbar changeView={changeView} />
      <Sidebar changeView={changeView} />
      
      <div className="viewdiv">
      {View === "product" ? <ListOfProducts /> : <ListOfUsers />}</div>
    </div>
  );
}

export default App;
