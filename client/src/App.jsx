import { useState } from 'react'
import './App.css'

import Main from './components/main'
import {BrowserRouter 
  as Router,Routes, Route
} from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      

       <div>
      <Router>
      <Routes>
     {/* for both */}
     <Route path="/" element={<Main/>} />
       <Route path="/detailes" element={<productDetailes/>}/>
       <Route path="/profile" element={<profile/>}/>


         {/* client */}
       
        <Route path="/login" element={<login/>}/>
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
