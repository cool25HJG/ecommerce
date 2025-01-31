import React, { useState } from 'react';



function AdminProfile({admin,updateUser,changeView}) {
    const [editMode, setEditMode] = useState(false);
    const [firstName, setfirstName] = useState("");
      const [lastName, setlastName] = useState("");
      const[adress,setadress] = useState("")
      const [phoneNumber, setphoneNumber] = useState(0); 
    const handleEditClick = () => {
      setEditMode(!editMode);
    };
  
    return (
      <div>
        <div className="container min-vh-100 bg-light p-4">
        <h1 className="h3 text-success mb-4">My Profile</h1>
  
        {/* Profile Card */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <img
                src={admin.image}
                alt="Profile"
                className="rounded-circle me-3"
                style={{ width: '80px', height: '80px' }}
              />
              <div>
                <h5 className="d-flex align-items-center">
                  {admin.firstName} {admin.lastName}
                  <span className="badge bg-danger ms-2">{admin.role}</span>
                </h5>
                <p className="text-muted">{admin.adresse}</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Personal Information */}
        <div className="card shadow-sm mb-4">
          <div className="card-header d-flex justify-content-between">
            <h5 className="mb-0 text-success">Personal Information</h5>
            <button
              className="btn btn-sm btn-outline-warning"
              onClick={handleEditClick}
            >
              Edit
            </button>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-4">
                <p className="text-muted mb-1">First Name</p>
                {editMode ? (
                  <input
                    type="text"
                    defaultValue={admin.firstName}
                    className="form-control"
                    onChange={(e) => {
                      setfirstName(e.target.value);
                    }}
                  />
                ) : (
                  <p>{admin.firstName}</p>
                )}
              </div>
              <div className="col-12 col-md-4">
                <p className="text-muted mb-1">Last Name</p>
                {editMode ? (
                  <input
                    type="text"
                    defaultValue={admin.lastName}
                    className="form-control"
                    onChange={(e) => {
                      setlastName(e.target.value);
                    }}
                  />
                ) : (
                  <p>{admin.lastName}</p>
                )}
              </div>
              
              <div className="col-12 col-md-4">
                <p className="text-muted mb-1">Email Address</p>
                {editMode ? (
                 <p>{admin.email}</p>
                ) : (
                  <p>{admin.email}</p>
                )}
              </div>


              <div className="col-12 col-md-4">
                <p className="text-muted mb-1">Phone Number</p>
                {editMode ? (
                  <input
                    type="tadmin"
                    defaultValue={admin.phoneNumber}
                    className="form-control"
                    onChange={(e) => {
                      setphoneNumber(e.target.value);
                    }}
                  />
                ) : (
                  <p>(+216) {admin.
                    phoneNumber}</p>
                )}
              </div>


              {editMode ?(<div className="col-12 col-md-4">
                <p className="text-muted mb-1">City</p>
                <input
                    type="tadmin"
                    defaultValue={admin.adresse}
                    className="form-control"
                    onChange={(e) => {
                      setadress(e.target.value);
                    }}
                  />
              </div>) : (<div className="col-12 col-md-4">
                <p className="text-muted mb-1">User Role</p>
                <p>{admin.role}</p>
              </div>)}
              {editMode ? (<div className="col-12 col-md-4">
                <p className="text-muted mb-1"> Update Button </p><button type="button" onClick={()=>{updateUser(admin.id,{firstName:firstName,lastName:lastName,phoneNumber:phoneNumber,adresse:adress}),changeView("profile"),handleEditClick()}} className="btn btn-secondary" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></button></div>):("")}
            </div>
            
          </div>
        </div>
  
        {/* Address */}
        <div className="card shadow-sm mb-4">
          <div className="card-header d-flex justify-content-between">
            <h5 className="mb-0 text-success">Address</h5>
            <button
              className="btn btn-sm btn-outline-warning"
              onClick={handleEditClick}
            >
              Edit
            </button>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-4">
                <p className="text-muted mb-1">Country</p>
                <p>Tunisia</p>
              </div>
              <div className="col-12 col-md-4">
                <p className="text-muted mb-1">City</p>
                <p>{admin.adresse}</p>
              </div>
             
            </div>
          </div>
        </div>
      </div>
        
      </div>
      
    );
}

export default AdminProfile
