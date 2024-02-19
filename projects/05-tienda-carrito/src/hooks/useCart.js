import { useContext } from 'react'
import { CartContext } from '../context/carts'

export function useCart () {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCat is indefined, set the provider correctly')
  }

  return context
}
