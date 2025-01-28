// import { useState } from 'react'
import './App.css'
import {BrowserRouter 
  as Router,Routes, Route
} from "react-router-dom";
import Dashboard from './componets/dashbored';
// import axios from "axios";
function App() {


  return (
    <>
      
      <Router>
      <Routes>
         
        <Route path="/" element={<Dashboard/>} />
        <Route path="/listofclients" element={<listofclients/>}/>
        <Route path="listofsellers" element={<listofsellers/>}/>
        <Route path="listofproducts" element={<listofproducts/>}/>
        <Route path="listofcategories" element={<listofcategories/>}/>

        <Route path="addcategoy" element={<addcategoy/>}/>
        {/* other rootes for product and client and sellers and maybe update product   */}
        {/* and view users profile */}
      </Routes>
      </Router>
   



      
    </>
  )
}

export default App
