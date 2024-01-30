import { useState, useEffect } from 'react'
import { apiImages } from '../apis'

export function useCatImage ({ fact }) {
  // return {urlImage: 'http.. }
  const [urlImage, setUrlImage] = useState(null)
  useEffect(() => {
    if (!fact) return
    fetch(apiImages)
      .then(res => {
        if (!res.ok) throw new Error('Ha ocurrido un error en la solicirud de la imagen')
        return res.json()
      })
      .then(data => {
        const { url } = data[0]
        setUrlImage(url)
      })
      .catch(error => console.log(error))
  }, [fact])
  console.log()
  return { urlImage }
}
