import { useState } from 'react'
import './App.css'
import { Prducts } from './components/Products'
import { useFilters } from './hooks/useFilters'
import { products as initialProducts } from './mocks/products.json'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Cart } from './components/Cart'
import { CartProvider } from './context/carts'

function App () {
  const [products] = useState(initialProducts)

  const { filterProducts } = useFilters(products)

  const filteredProducts = filterProducts(products)

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Prducts products={filteredProducts} />
      <Footer />
    </CartProvider>
  )
}

export default App
