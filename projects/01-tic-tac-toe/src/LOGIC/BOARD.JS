import { WINNER_COMBOS } from "../constants"

export const checkWinner = (checkBoard) =>{
    //Revismos es todas las posiciones ganadoras
    for(const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if(
        checkBoard[a] && //Hay algo en el primer elmento 
        checkBoard[a] === checkBoard[b] && //El prier elemento es igual al segundo
        checkBoard[b] === checkBoard[c] //El segundo elemento es igual al tercero
      ){
        return  checkBoard[a] //Ha ganado el de al posicion a
      }
    }
    return null //Si no gana nadie
  }