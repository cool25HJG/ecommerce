import { useEffect } from 'react'
import Oneproduct from "./Oneproduct";

function Listofproducts({product, fetch}) {
  useEffect(() => {
    fetch()
  }, []);
 
  return (
    <div className="seller-products-container">
      <div className="seller-products-grid">
        {product.map((product) => (
          <Oneproduct
            key={product.id}
            product={product}
            fetch={fetch}
          />
        ))}
      </div>
    </div>
  )
}

export default Listofproducts
