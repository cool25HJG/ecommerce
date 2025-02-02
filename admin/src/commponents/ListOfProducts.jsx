import React, { useState } from "react";

function ListOfProducts({ product, DeleteProducts, updateProducts, changeView, category }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [sellerId, setSellerId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [show, setShow] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const toggle = (action, currentCategoryId) => {
    setShow(show === action ? 0 : action);
    setCategoryId(currentCategoryId);
  };

  const truncateText = (text, maxLength) => (text.length <= maxLength ? text : text.slice(0, maxLength) + "...");

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredProducts = product.filter((p) => p.name.toLowerCase().includes(searchTerm));

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      <div className="mb-3 d-flex justify-content-center ">
  <input
    type="text"
    placeholder="Search by name..."
    value={searchTerm}
    onChange={handleSearch}
    className="form-control w-50"
  />
</div>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => requestSort("id")}>ID {sortConfig.key === "id" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}</th>
            <th onClick={() => requestSort("name")}>Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}</th>
            <th>Description</th>
            <th onClick={() => requestSort("price")}>Price {sortConfig.key === "price" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}</th>
            <th onClick={() => requestSort("stock")}>Stock {sortConfig.key === "stock" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}</th>
            <th>Seller</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((el) => (
            <tr key={el.id}>
              <td>{el.id}</td>
              <td>{show !== el.id ? el.name : <input type="text" defaultValue={el.name} className="form-control" onChange={(e) => setName(e.target.value)} />}</td>
              <td>{show !== el.id ? truncateText(el.description, 24) : <input type="text" defaultValue={el.description} className="form-control" onChange={(e) => setDescription(e.target.value)} />}</td>
              <td>{show !== el.id ? el.price : <input type="text" defaultValue={el.price} className="form-control" onChange={(e) => setPrice(e.target.value)} />}</td>
              <td>{show !== el.id ? el.stock : <input type="text" defaultValue={el.stock} className="form-control" onChange={(e) => setStock(e.target.value)} />}</td>
              <td>{el.User.firstName}</td>
              <td>
                {show !== el.id ? (
                  el.Category.name
                ) : (
                  <select className="form-control" value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))}>
                    {category.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                )}
              </td>
              <td>
                {show !== el.id ? (
                  <>
                    <button className="btn btn-outline-danger" onClick={() => {
                       DeleteProducts(el.id);
                    }}>Delete</button>
                    <button className="btn btn-outline-success" onClick={() => toggle(el.id, el.categoryId)}>Edit</button>
                  </>
                ) : (
                  <button className="btn btn-outline-success" onClick={() => {
                    updateProducts(el.id, { name, description, price, stock, sellerId, categoryId });
                    toggle(el.id);
                  }}>Update</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListOfProducts;
