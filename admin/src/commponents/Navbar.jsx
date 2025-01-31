import React from 'react'

function Navbar({changeView}) {
  return (
    <div>
  <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarTogglerDemo01">
      <a className="navbar-brand" href="#">Dashbord</a>

      {/* Center the search bar */}
      <div className="mx-auto">
        <form className="d-flex"  role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        </form>
      </div>

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Admin
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Log out</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar
