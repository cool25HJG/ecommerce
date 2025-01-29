import React from 'react'

function Sidebar({changeView}) {
  return (
    <div>
   <div className="sidebar">
  <a className="active" href="#home">Admin Dashbord</a>
  <a href="#user" onClick={()=>changeView("user")}>List Users</a>
  <a href="#product" onClick={()=>changeView("product")}>List Product</a>
  <a href="#categories" onClick={()=>changeView("categories")}>List Categories</a>
</div>
    </div>
  )
}

export default Sidebar
