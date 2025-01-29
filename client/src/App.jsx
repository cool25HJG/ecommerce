// import { useState } from 'react'
import './App.css'
// import axios from 'axios'
import Main from './components/main'
import Login from './components/login';
import List from './components/listProduct.Client'
import Register from './components/Register';
import listOfProduct from './components/seller/listofproduct';
import {BrowserRouter 
  as Router,Routes, Route
} from "react-router-dom";


function App() {
  // const [count, setCount] = useState(0)

  const [product, setproduct] = useState([]);

const fetch = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/Products/");
    console.log(response.data);
    setproduct(response.data);
  } catch (error) {
    throw error;
  }

  useEffect(() => {
    fetch();
  }, []);
};
  return (
    <>
      

       <div >
      <Router>
      <Routes>
     {/* for both */}
     <Route path="/" element={<Main/>} />
       <Route path="/detailes" element={<productDetailes/>}/>
       <Route path="/profile" element={<profile/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>

       <Route path="/list" element={<List/>}/>

         {/* client */}
       
        
        <Route path="/cart" element={<cart/>}/>
        <Route path="/Wishlist" element={<wishlist/>}/>
        
       {/* seller */}
        <Route path="/listofproduct" element={<listofproduct/>}/>
        <Route path="/add" element={<addproduct/>}/>
        <Route path="/update" element={<updateproduct/>}/>
        <Route path="/delete" element={<delete/>}/>
    
      </Routes>
      </Router>
    </div>


    </>
  )
}

export default App
