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
  <a href="#categories" onClick={()=>changeView("categories")}>List Categories</a>
  <a href="#" onClick={()=>{toggle("yes")}} >Add categorie</a>
  {show==="yes"&&<input  className="form-control" type="text" value="Readonly input here..." aria-label="readonly input example" readOnly typeof="text" onChange={(e)=>{setname(e.target.value)}} />}
  <div style={{display:"flex",justifyContent:"center",marginTop:"1px"}}><button type='button' className='btn btn-outline-success'   onClick={()=>{addCategory({name:name})}}>ADD</button></div>
  
</div>
    </div>
  )
}

export default Sidebar
