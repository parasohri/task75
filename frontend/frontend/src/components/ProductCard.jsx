import React from 'react'

function ProductCard({product}) {
  return (
    <div>
      <h1>Product Card</h1>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  )
}

export default ProductCard
