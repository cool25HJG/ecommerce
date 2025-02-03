import React, { useState } from "react";
import "../App.css"
function ListOfUsers({ users, DeleteUser, updateUser, changeView }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [show, setShow] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" }); // State for sorting
 

  // Toggle edit mode
  const toggle = (action) => {
    if (show === action) {
      setShow(0);
    } else {
      setShow(action);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <div>
      {/* Search Bar */}<div className="search-div"> 
      <div className="mb-3 d-flex justify-content-center ">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="form-control w-50"
        />
      </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col" onClick={() => requestSort("id")}>
              Users_id{" "}
              {sortConfig.key === "id"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : "↑↓"}
            </th>
            <th scope="col" onClick={() => requestSort("firstName")}>
              First Name{" "}
              {sortConfig.key === "firstName"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : "↑↓"}
            </th>
            <th scope="col" onClick={() => requestSort("lastName")}>
              Last Name{" "}
              {sortConfig.key === "lastName"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : "↑↓"}
            </th>
            <th scope="col" onClick={() => requestSort("phoneNumber")}>
              Phone Number{" "}
              {sortConfig.key === "phoneNumber"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : "↑↓"}
            </th>
            <th scope="col" onClick={() => requestSort("email")}>
              Email{" "}
              {sortConfig.key === "email"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : "↑↓"}
            </th>
            <th scope="col" onClick={() => requestSort("role")}>
              Role{" "}
              {sortConfig.key === "role"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : "↑↓"}
            </th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((el) => {
            return (
              <tr key={el.id}>
                <th scope="row">{el.id}</th>
                {show !== el.id && <td>{el.firstName}</td>}
                {show !== el.id && <td>{el.lastName}</td>}
                {show !== el.id && <td>{el.phoneNumber}</td>}
                {show !== el.id && <td>{el.email}</td>}
                {show !== el.id && <td>{el.role}</td>}

                {show === el.id && (
                  <td>
                    <input
                      type="text"
                      id="name"
                      defaultValue={el.firstName}
                      className="form-control"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </td>
                )}
                {show === el.id && (
                  <td>
                    <input
                      type="text"
                      id="name"
                      defaultValue={el.lastName}
                      className="form-control"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </td>
                )}
                {show === el.id && (
                  <td>
                    <input
                      type="text"
                      id="name"
                      defaultValue={el.phoneNumber}
                      className="form-control"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </td>
                )}
                {show === el.id && (
                  <td>
                    <input
                      type="text"
                      id="Email"
                      defaultValue={el.email}
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </td>
                )}

                {/* Dropdown for Role (Seller or Client or Admin) */}
                {show === el.id && (
                  <td>
                    <select
                      className="form-control"
                      value={role || el.role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="Client">Client</option>
                      <option value="Seller">Seller</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                )}

                {/* Actions */}
                {show !== el.id && (
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => {
                        DeleteUser(el.id);
                        changeView("user");
                      }}
                    >
                      Delete{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={() => toggle(el.id)}
                    >
                      Edit{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                        />
                      </svg>
                    </button>
                  </td>
                )}

                {/* Save changes */}
                {show === el.id && (
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={() => {
                        updateUser(el.id, {
                          firstName,
                          lastName,
                          phoneNumber,
                          role,
                          email,
                        });
                        changeView("user");
                        toggle(el.id);
                      }}
                    >
                      Update
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListOfUsers;
