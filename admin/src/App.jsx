import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter 
  as Router,Routes, Route
} from "react-router-dom";
// import main from './components/main.jsx'
// import login from './components/login.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Router>
      <Routes>
         {/* client */}
        <Route path="/" element={<main/>} />
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
   



        {/* <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p> */}
     
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
