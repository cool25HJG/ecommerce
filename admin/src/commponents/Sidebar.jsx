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
  <a href="#user" onClick={()=>changeView("user")}>List Users</a>
  <a href="#product" onClick={()=>changeView("product")}>List Product</a>
  <a href="#categories" onClick={()=>{changeView("categories"),toggle("wari")}}>List Categories</a>
  {show==="wari"&&<a href="#" onClick={()=>{toggle("yes")}} >Add categorie</a>}
  {show==="yes"&&<div style={{display:"flex",justifyContent:"center",marginTop:"5px"}}><input  className="form-control" type="text" placeholder='entre category name' aria-label="entre category name"  typeof="text" onChange={(e)=>{setname(e.target.value)}} /></div>}
  {show==="yes"&&<div style={{display:"flex",justifyContent:"center",marginTop:"10px"}}><button type='button' className='btn btn-secondary'   onClick={()=>{addCategory({name:name})}}>ADD</button></div>}
  
</div>
    </div>
  )
}

export default Sidebar
