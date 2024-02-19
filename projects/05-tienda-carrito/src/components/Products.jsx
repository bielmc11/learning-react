import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart.js'

export function Prducts ({ products }) {
  const { addToCart, cart, removeFromCart } = useCart() //! Me falta mirar que lo haya llado igual

  const checkProductInCar = (product) => {
    return cart.some(item => item.id === product.id)
  }

  return (
    <main className='products'>
      <ul>
        {
            products.map(product => {
              const isProductInCar = checkProductInCar(product)

              return (
                <li key={product.id}>
                  <img src={product.thumbnail} alt={product.title} />
                  <div>
                    <strong> {product.title} - ${product.price}</strong>
                    <div>
                      <button
                        style={{ backgroundColor: isProductInCar ? 'red' : '#09f' }} onClick={() => {
                          isProductInCar
                            ? removeFromCart(product)
                            : addToCart(product)
                        }}
                      >
                        {
                        isProductInCar
                          ? <RemoveFromCartIcon />
                          : <AddToCartIcon />

                        }
                      </button>
                    </div>
                  </div>
                </li>
              )
            })
        }
      </ul>
    </main>
  )
}
