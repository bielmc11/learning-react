import { useState } from 'react'

export function Footer () {
  const [count, setCount] = useState(0)

  const handleState = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <p>soy el footer {count}</p>
      <button onClick={handleState}>SUMAA</button>
    </div>

  )
}
