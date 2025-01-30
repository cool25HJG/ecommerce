import React, { useState } from 'react'

function ListOfProducts({product,DeleteProducts,updateProducts,changeView}) {
  const [name,setname]=useState("")
  const [description,setdescription]=useState("")
  const [price,setprice]=useState(0)
  const [stock,setstock]=useState(0)
  const [sellerId,setsellerId]=useState(0)
  const [categoryId,setcategoryId]=useState(0)
  const [show,setshow]=useState(0)
  const toggle =(action)=>{
    if(show === action){
      setshow(0)
    } else {
      setshow(action)
    }

  }
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
          <th scope="col">product_id</th>
            <th scope="col">name</th>
            <th scope="col">description</th>
            <th scope="col">price</th>
            <th scope="col">stock</th>
            <th scope="col">seller</th>
            <th scope="col">category</th>
            <th scope="col">action </th>
          </tr>
        </thead>
        <tbody>
          {product.map((el)=>{
            return (
<tr key={el.id}>
            <th scope="row" >{el.id}</th>
            {show!==el.id && <td>{el.name}</td>}
            {show!==el.id && <td>{el.description}</td>}
            {show!==el.id && <td>{el.price}</td>}
            {show!==el.id && <td>{el.stock}</td>}
            {show!==el.id && <td>{el.User.firstName
            }</td>}
            {show!==el.id && <td>{el.Category.name}</td>}
            {show === el.id && <td><input  type="text"
                    id="name"
                    defaultValue={el.name}
                    className="form-control"
                    onChange={(e) => {
                      setname(e.target.value);
                    }}/></td>}
                    {show === el.id && <td><input  type="text"
                    id="name"
                    defaultValue={el.description}
                    className="form-control"
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}/></td>}
                    {show === el.id && <td><input  type="text"
                    id="name"
                    defaultValue={el.price}
                    className="form-control"
                    onChange={(e) => {
                      setprice(e.target.value);
                    }}/></td>}
            {show === el.id && <td><input  type="text"
                    id="stock"
                    defaultValue={el.stock}
                    className="form-control"
                    onChange={(e) => {
                      setstock(e.target.value );
                    }}/></td>}
            {show === el.id && <td><input  type="text"
                    id="sellerId"
                    defaultValue={el.sellerId}
                    className="form-control"
                    onChange={(e) => {
                      setsellerId(e.target.value)}}/></td>}
                      {show === el.id && <td><input  type="text"
                    id="categoryId"
                    defaultValue={el.Category.name}
                    className="form-control"
                    onChange={(e) => {
                      setcategoryId(e.target.value)}}/></td>}


            {show!== el.id && <td>
            <button type='button' className='btn btn-outline-danger' onClick={()=>{DeleteProducts(el.id),changeView("product")}}> Delete <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button>
             <button type='button' className='btn btn-outline-success'  onClick={()=>{toggle(el.id)}} >Edit <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></button>
            </td>}
            {show===el.id && <td>
              <button type='button' className='btn btn-outline-success' onClick={()=>{updateProducts(el.id,{name:name,description:description,price:price,sellerId:sellerId,stock:stock,categoryId:categoryId}),changeView("product"),toggle(el.id)}}>Update</button>
              </td>}
            
          </tr>
            )
          })}
          
        </tbody>
      </table> 
    </div>
  );
}

export default ListOfProducts;
