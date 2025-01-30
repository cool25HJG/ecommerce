import React, { useState } from 'react'

function ListOfUsers({users,DeleteUser,updateUser}) {
  const [firstName,setfirstName]=useState("")
  const [lastName,setlastName]=useState("")
  const [phoneNumber,setphoneNumber]=useState(0)
  const [email,setemail]=useState("")
  const [role,setrole]=useState("")
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
          <th scope="col">Users_id</th>
            <th scope="col">firstName</th>
            <th scope="col">lastName</th>
            <th scope="col">phoneNumber</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">action </th>
          </tr>
        </thead>
        <tbody>
          {users.map((el)=>{
            return (
<tr key={el.id}>
            <th scope="row" >{el.id}</th>
            {show!==el.id && <td>{el.firstName}</td>}
            {show!==el.id && <td>{el.lastName}</td>}
            {show!==el.id && <td>{el.phoneNumber}</td>}
            {show!==el.id && <td>{el.email}</td>}
            {show!==el.id && <td>{el.role}</td>}
            {show === el.id && <td><input  type="text"
                    id="name"
                    defaultValue={el.firstName}
                    className="form-control"
                    onChange={(e) => {
                      setfirstName(e.target.value);
                    }}/></td>}
                    {show === el.id && <td><input  type="text"
                    id="name"
                    defaultValue={el.lastName}
                    className="form-control"
                    onChange={(e) => {
                      setlastName(e.target.value);
                    }}/></td>}
                    {show === el.id && <td><input  type="text"
                    id="name"
                    defaultValue={el.phoneNumber}
                    className="form-control"
                    onChange={(e) => {
                      setphoneNumber(e.target.value);
                    }}/></td>}
            {show === el.id && <td><input  type="text"
                    id="Email"
                    defaultValue={el.email}
                    className="form-control"
                    onChange={(e) => {
                      setemail(e.target.value );
                    }}/></td>}
            {show === el.id && <td><input  type="text"
                    id="Role"
                    defaultValue={el.role}
                    className="form-control"
                    onChange={(e) => {
                      setrole(e.target.value)}}/></td>}


            {show!== el.id && <td>
            <button type='button' className='btn btn-outline-danger' onClick={()=>{DeleteUser(el.id),window.location.reload()}}> Delete <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button>
             <button type='button' className='btn btn-outline-success'  onClick={()=>{toggle(el.id)}} >Edit <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></button>
            </td>}
            {show===el.id && <td>
              <button type='button' className='btn btn-outline-success' onClick={()=>updateUser(el.id,{firstName:firstName,lastName:lastName,phoneNumber:phoneNumber,role:role,email:email})}>Update</button>
              </td>}
            
          </tr>
            )
          })}
          
        </tbody>
      </table> 
    </div>
  )
}

export default ListOfUsers
