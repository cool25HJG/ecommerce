// import { useState } from 'react'
import './App.css'
// import axios from 'axios'
import Main from './components/main'
import Login from './components/login';
import Register from './components/Register';

import {BrowserRouter 
  as Router,Routes, Route
} from "react-router-dom";


function App() {
  // const [count, setCount] = useState(0)

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
