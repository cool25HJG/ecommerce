import React from 'react'
import { useState } from 'react'

function Sidebar({changeView,addCategory}) {
  const [name,setname]=useState("")
  const [show,setshow]=useState("")
  const toggle =(action)=>{
    if(show === action){
      setshow("")
    } else {
      setshow(action)
    }
  }
    

  return (
    <div>
   <div className="sidebar">
  <a className="active" href="#home">Admin Dashbord</a>
  <a href="#user" onClick={()=>{changeView("user"),toggle("5abi")}}>List Users</a>
  <a href="#product" onClick={()=>{changeView("product"),toggle("5abi")}}>List Product</a>
  <a href="#category" onClick={()=>{changeView("category"),toggle("wari")}}>List Categories</a>
  {show==="wari"&&<a href="#" onClick={()=>{toggle("yes")}} >Add categorie</a>}
  {show==="yes"&&<div style={{display:"flex",justifyContent:"center",marginTop:"5px"}}><input  className="form-control" type="text" placeholder='entre category name' aria-label="entre category name"  typeof="text" onChange={(e)=>{setname(e.target.value)}} /></div>}
  {show==="yes"&&<div style={{display:"flex",justifyContent:"center",marginTop:"10px"}}><button type='button' className='btn btn-secondary'   onClick={()=>{addCategory({name:name}),changeView("category"),toggle("houssem")}}>ADD</button></div>}
  
</div>
    </div>
  )
}

export default Sidebar
