import React from 'react'
import './produits.css'
import pic1 from './pic.png/pic1.jpeg'
import pic2 from './pic.png/pic2.jpeg'
import pic3 from './pic.png/pic3.jpeg'
import pic4 from './pic.png/pic4.jpeg'
import pic5 from './pic.png/pic5.jpeg'
import pic6 from './pic.png/pic6.jpeg'

export const products = [
  {
    id: 1,
    name: 'rode',
    price: 19.99,
    image: pic1,
  },
  {
    id: 2,
    name: 'rode',
    price: 19.99,
    image: pic2,
  },
  {
    id: 3,
    name: 'rode',
    price: 19.99,
    image: pic3,
  },
  {
    id: 4,
    name: 'rode',
    price: 19.99,
    image: pic4,
  },
    
  
  {
    id: 5,
    name: 'rode',
    price: 19.99,
    image: pic5,
  },
  {
    id: 6,
    name: 'rode',
    price: 19.99,
    image: pic6,
  },
]
function Product() {
  return (
    <div className="products">
      {products.map((p) => (
        <div key={p.id} className="product">
          <img src={p.image} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </div>
      ))}
    </div>
  )
}

export default Product