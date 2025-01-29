import { useState } from "react";
import "./App.css";
import ListOfProducts from "./commponents/ListOfProducts";
import ListOfUsers from "./commponents/ListOfUsers";
import Navbar from "./commponents/Navbar.jsx";
import Sidebar from "./commponents/Sidebar.jsx";
function App() {
  const [View, setView] = useState("product");
  const changeView = (view) => {
    setView(view);
  };
  return (
    <div>
     <Navbar changeView={changeView} />
      <Sidebar />
      <div>{View === "product" ? <ListOfProducts /> : <ListOfUsers />}</div>
    </div>
  );
}

export default App;
