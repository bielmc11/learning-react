import './app.css'
import { NewCat } from './components/NewCat'
import { useCatImage } from './hooks/useCatImages'
import { useCatFact } from './hooks/useCatFact'

export default function App () {
  const { fact, refreshRandomFact } = useCatFact()
  const { urlImage } = useCatImage({ fact })

  const handleClick = async () => {
    refreshRandomFact()
  }

  return (
    <main>
      <section>
        <h1>RECUPERO UNA IMAGEN SEGUN LA FRASE</h1>
        {/* {fact && <p> {fact} </p>} */}
        <div className='image_wrapper'>
          {urlImage && <img src={urlImage} alt='Imagen del gatito' />}
        </div>
        <NewCat handleClick={handleClick} />
      </section>
    </main>
  )
}
