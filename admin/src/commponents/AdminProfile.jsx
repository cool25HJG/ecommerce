import React, { useState } from 'react';



function AdminProfile() {
    const [editMode, setEditMode] = useState(false);

    const handleEditClick = () => {
      setEditMode(!editMode);
    };
  
    return (
      <div className="container min-vh-100 bg-light p-4">
        <h1 className="h3 text-success mb-4">My Profile</h1>
  
        {/* Profile Card */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <img
                src="https://scontent.ftun2-2.fna.fbcdn.net/v/t39.30808-6/441526275_844702864363914_6387689304949025577_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=58ZJSUCkT4EQ7kNvgFY07VQ&_nc_zt=23&_nc_ht=scontent.ftun2-2.fna&_nc_gid=AE2LY1Shy2vIoZSa2mYIerb&oh=00_AYCpzgt1qZZlq6ge3BXC4M2ncVjLjpIu5huoXmFyP1QMLQ&oe=67A27E89"
                alt="Profile"
                className="rounded-circle me-3"
                style={{ width: '80px', height: '80px' }}
              />
              <div>
                <h5 className="d-flex align-items-center">
                  Ghassen Kharrat
                  <span className="badge bg-danger ms-2">Admin</span>
                </h5>
                <p className="text-muted">rue jalouli, tunis</p>
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
                    defaultValue="Natashia"
                    className="form-control"
                  />
                ) : (
                  <p>Ghassen</p>
                )}
              </div>
              <div className="col-12 col-md-4">
                <p className="text-muted mb-1">Last Name</p>
                {editMode ? (
                  <input
                    type="text"
                    defaultValue="Khaleira"
                    className="form-control"
                  />
                ) : (
                  <p>Kharrat</p>
                )}
              </div>
              
              <div className="col-12 col-md-4">
                <p className="text-muted mb-1">Email Address</p>
                {editMode ? (
                  <input
                    type="email"
                    defaultValue="info@binary-fusion.com"
                    className="form-control"
                  />
                ) : (
                  <p>Ghassenkharrat@gmail.com</p>
                )}
              </div>
              <div className="col-12 col-md-4">
                <p className="text-muted mb-1">Phone Number</p>
                {editMode ? (
                  <input
                    type="tel"
                    defaultValue="(+62) 821 2554-5846"
                    className="form-control"
                  />
                ) : (
                  <p>(+216) 29842206</p>
                )}
              </div>
              <div className="col-12 col-md-4">
                <p className="text-muted mb-1">User Role</p>
                <p>Admin</p>
              </div>
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
                <p>rue jalouli, karouin</p>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    );
}

export default AdminProfile
