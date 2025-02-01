import { useEffect, useState } from "react";
import "./App.css";
import ListOfProducts from "./commponents/ListOfProducts";
import ListOfUsers from "./commponents/ListOfUsers";
import ListOfCategory from "./commponents/ListOfCategory.jsx";
import Navbar from "./commponents/Navbar.jsx";
import Sidebar from "./commponents/Sidebar.jsx";
import axios from "axios";
import AdminProfile from "./commponents/AdminProfile.jsx";
import LoginAdmin from "./commponents/LoginAdmin.jsx";
import Dashbord from "./commponents/Dashboard.jsx";
function App() {
  const [View, setView] = useState("login");
  const [users, setusers] = useState([]);
  const [product, setproduct] = useState([]);
  const [category, setcategory] = useState([]);
  const [admin, setadmin] = useState([]);
  const [clientsellers , setclientsellers ] = useState([])

  const changeView = (view) => {
    setView(view);
  };
  const fetchUsers = () => {
    axios
      .get(import.meta.env.VITE_HOST + "/api/user")
      .then((res) => {
        setusers(res.data);
      })
      .catch((err) => console.error("err fetching user", err));
  };
  const fetchClientSellers = () => {
    axios
      .get(import.meta.env.VITE_HOST + "/api/user/cs/users")
      .then((res) => {
        setclientsellers(res.data);
      })
      .catch((err) => console.error("err fetching user", err));
  };
  const fetchProducts = () => {
    axios
      .get(import.meta.env.VITE_HOST + "/api/Products")
      .then((res) => {
        setproduct(res.data);
      })
      .catch((err) => console.error("err fetching product", err));
  };
  const fetchCategory = () => {
    axios
      .get(import.meta.env.VITE_HOST + "/api/Category")
      .then((res) => {
        setcategory(res.data);
      })
      .catch((err) => console.error("err fetching category", err));
  };

  const DeleteUser = (id) => {
    axios
      .delete(import.meta.env.VITE_HOST + `/api/user/${id}`)
      .then(() => {
        console.log("deleted");
        fetchUsers();
      })
      .catch((err) => {
        console.err("err delete", err);
      });
  };
  const DeleteProducts = (id) => {
    axios
      .delete(import.meta.env.VITE_HOST + `/api/Products/${id}`)
      .then(() => {
        console.log("deleted");
        fetchProducts();
      })
      .catch((err) => {
        console.err("err delete", err);
      });
  };
  const DeleteCategory = (id) => {
    axios
      .delete(import.meta.env.VITE_HOST + `/api/Category/${id}`)
      .then(() => {
        console.log("deleted");
        fetchCategory();
      })
      .catch((err) => {
        console.err("err delete", err);
      });
  };

  const updateUser = (id, body) => {
    axios
      .put(import.meta.env.VITE_HOST + `/api/user/${id}`, body)
      .then(() => {
        console.log("updated"), fetchUsers() ,fetchClientSellers()
      })
      .catch((err) => console.error("err updating", err));
  };
  const updateProducts = (id, body) => {
    axios
      .put(import.meta.env.VITE_HOST + `/api/Products/${id}`, body)
      .then(() => {
        console.log("updated"), fetchProducts();
      })
      .catch((err) => console.error("err updating", err));
  };
  const updateCategory = (id, body) => {
    axios
      .put(import.meta.env.VITE_HOST + `/api/Category/${id}`, body)
      .then(() => {
        console.log("updated");
        fetchCategory();
      })
      .catch((err) => console.error("err updating", err));
  };

  const addCategory = (body) => {
    axios
      .post(import.meta.env.VITE_HOST + "/api/Category", body)
      .then(() => {
        console.log("added");
        alert("new category added");
        fetchCategory();
      })
      .catch((err) => console.log("error adding cat"));
  };
  const getAdmin = (admin) => {
    axios
      .get(import.meta.env.VITE_HOST + `/api/user/get/${admin}`)
      .then((res) => {
        setadmin(res.data);
      })
      .catch((err) => console.error("error fetching admin", err));
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchCategory();
    fetchClientSellers()
  }, []);
console.log("clientsellers",clientsellers)
  return (
    <div>
      {View !=="login" && <Navbar changeView={changeView} admin={admin} />}
      {View !=="login" &&<Sidebar changeView={changeView} addCategory={addCategory} />}


      {View === "login"&&<LoginAdmin changeView={changeView} getAdmin={getAdmin} />}
      <div className="viewdiv">
        {View === "product" ? (
          <ListOfProducts
            updateProducts={updateProducts}
            DeleteProducts={DeleteProducts}
            product={product}
            changeView={changeView}
          />
        ) : View === "user" ? (
          <ListOfUsers
            updateUser={updateUser}
            clientsellers={clientsellers}
            changeView={changeView}
            DeleteUser={DeleteUser}
          />
        ) : View === "category" ? (
          <ListOfCategory
            category={category}
            updateCategory={updateCategory}
            DeleteCategory={DeleteCategory}
            addCategory={addCategory}
            changeView={changeView}
          />
        ) : 
        View ==="profile" ?
          <AdminProfile
            admin={admin}
            updateUser={updateUser}
            changeView={changeView}
          />
        : 
        View ==="dashboard" ?
       <Dashbord users={users}/>
          :
          ""
        }
      </div>
    </div>
  );
}

export default App;
