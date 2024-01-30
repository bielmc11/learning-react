import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/facts'

export const useCatFact = () => {
  const [fact, setFact] = useState()

  const refreshRandomFact = () => {
    getRandomFact().then(newFact => setFact(newFact)) // Es lo mismo que then(setFact)
  }

  useEffect(refreshRandomFact, [])

  return { fact, refreshRandomFact }
}
