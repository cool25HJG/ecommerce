import React from 'react'
import Listofproducts from './Listofproducts'
function MainSeller({product,fetch}) {
    return (
        <div>
          {<Listofproducts product={product} fetch={fetch}/>}
        </div>
      )
}

export default MainSeller
