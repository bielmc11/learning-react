import { useId } from 'react'
import { ClearCartIcon, CartIcon } from './Icons'
import './Cart.css'
import { useCart } from '../hooks/useCart'

function CartItem ({ thumbnail, price, title, quantity, addToCart }) {
  return (
    <li>
      <img src={thumbnail} alt='title' />
      <div>
        <strong>{title} - </strong> ${price}
      </div>

      <footer>
        <small>
          Qty: {quantity}
        </small>
        <button onClick={addToCart}> + </button>
      </footer>
    </li>
  )
}

export function Cart () {
  const cartCheckboxId = useId()
  const { cart, addToCart, clearCart } = useCart()
  console.log('dentro del carrito', cart)
  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon /> {/* Cuando le clicke a la label se seleccionará el inpout y se verá el aside */}
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {
            cart.map(item => ( // Podria haberle pasado directamente {...item}
              <CartItem thumbnail={item.thumbnail} title={item.title} price={item.price} quantity={item.quantity} addToCart={() => addToCart(item)} key={item.id} />
            ))
          }
        </ul>

        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}
