/* eslint-disable react/prop-types */

import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'

const FollowMouse = () =>{
  const [enable, setEnable] = useState(false)
  const [position, setPosition] = useState({x:0, y:0})
  
  useEffect(() => {
    //console.log('Dentro del usEffect')
    const handleMove = (event) =>{
      const { clientX , clientY} = event
      setPosition({x: clientX, y: clientY} )
      //console.log('handlemove: ', { clientX, clientY })
    }
    
    if(enable){
      //console.log('dentro del condicional')
      window.addEventListener('pointermove', handleMove)
    }


    //! Se ejecuta siempre que se desmonta el componente sirve apra limpiar el useEffect (limpoiar suscripciones) Y cADA VEZ QUE CAMBIE LA DEPENDENCIA
    return () => {
      console.log('cleaniing up')
      window.removeEventListener('pointermove', handleMove);
    }; 
    
  }, [enable])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`,
        display: !enable ? 'none' : 'block'
      }}
      />

      <button onClick={() => setEnable(!enable)}>
        {enable ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
     
    </>
  )

}


function App() {
  const [mounted, setMounted] = useState(true)

  return (
   <main>
      {
        mounted && <FollowMouse/>
      }
      <button onClick={() => setMounted(!mounted) } > 
      {
        mounted ? 'Eliminar componente' : 'Volver a renderizaro'
      }
      </button>
   </main>

  )
}

export default App
