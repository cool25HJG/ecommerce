import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
       <div>
      <Router>
      <Routes>
     {/* for both */}
     <Route path="/" element={<main/>} />
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
