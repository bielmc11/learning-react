import { createContext, useReducer } from 'react'

export const CartContext = createContext()

// 1- Estado inicial
const initialState = []

// 2 - reducer
const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action
  switch (actionType) {
    case 'ADD_TO_CART': {
      const productInCarIndex = state.findIndex(item => item.id === actionPayload.id)

      if (productInCarIndex >= 0) {
        const newState = structuredClone(state)
        newState[productInCarIndex].quantity += 1
        return newState
      }

      return [
        ...state,
        {
          ...actionPayload, // el proiducto
          quantity: 1
        }
      ]
    }

    case 'REMOVE_FROM_CART': {
      return state.filter(item => item.id !== actionPayload.id)
    }

    case 'CLEAN_CART': {
      return []
    }
  }
  return state
}

export function CartProvider ({ children }) {
  /* const [cart, setCart] = useState([]) */
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(state)

  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = () => dispatch({
    type: 'CLEAN_CART'
  })

  /* const addToCart = (product) => {
    const productInCarIndex = cart.findIndex(item => product.id === item.id)
    console.log(' me meti')
    if (productInCarIndex >= 0) { // Si el prod ya esta en carrito, hace copia  profunda de la array y le suma una unidad //! creo que ahora nunca se accede aqui porque se elimina si hay mas de uno
      // TODO Otra forma de hacer copias profundas es con map o slice
      const newCart = structuredClone(cart)
      newCart[productInCarIndex].quantity += 1
      return setCart(newCart)
    }

    setCart( // Si no ha encontrado el producto
      [
        ...cart,
        {
          ...product,
          quantity: 1
        }

      ]
    )
  } */

  /* const removeFromCart = (product) => {
    setCart(prevState => (
      prevState.filter(item => item.id !== product.id)
    ))
  } */

  /* const clearCart = () => {
    setCart([])
  } */

  return (
    <CartContext.Provider value={{ cart: state, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
