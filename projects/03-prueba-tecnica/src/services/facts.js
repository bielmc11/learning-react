/* eslint-disable indent */
import { apiFacts } from '../apis'

 export const getRandomFact = () => {
    return fetch(apiFacts)
      .then(res => {
        if (!res.ok) throw new Error('Ha ocurrido un erroe en la peticion del fact')
        return res.json()
      })
      .then(data => {
        const myFact = data.fact.split(' ')[0]
        return myFact
      })
      .catch(error => console.log('ha ocurrido un error :(', error))
}
