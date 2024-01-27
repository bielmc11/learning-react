import confetti from "canvas-confetti"
import { useState } from "react"
import { Square } from "./components/Square"
import { TURNS } from "./constants"
import { checkWinner } from "./LOGIC/BOARD.JS"
import { WinnerModal } from "./components/WinnerModal"

function App() {
  //el tablero
  const [board, setBoard] = useState(Array(9).fill(null))

  //TURNO ACTUAL
  const [turn, setTurn] = useState(TURNS.X)

  //Hay ganadores
  const [winner, setWinner] = useState(null)
 

  //Cambio el turno
  const updateBoard = (index) =>{

    //Si ya hay algo en la posicion o ya hay un ganador no actualizo
    if ((board[index] || winner)) return
    
    //Actualizo el tablero
    const newBoard = [...board];
    newBoard[index] = turn
    setBoard(newBoard)

    //Actuaizo el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Revisamos si hay un ganador
    const newWinner = checkWinner(newBoard) //! UTILIZO NEWBOARD Y NO EL BOARD ACTUALIZADO PORQUE EL USESTATE ES ASINCRONO YU PUEDE TARDAR MAS EN ACTUALIZARSE QUE YO EN PASARLE EL NUEVO TABLERO (por tanto le pasaria e viejo jeje)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkFullBoard(newBoard)){
      setWinner(false)
    }

    }  

  

  const resetBoard = () =>{
    const nullBoard = Array(9).fill(null)
    setBoard(nullBoard)
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkFullBoard = (board) =>{
    return board.every((position) => position !== null)
    
  }

  return (
    <main className='board'>
      <h1>TIC TAC TOE</h1>
      <button onClick={resetBoard} >RESET</button>
      <section className='game'>
        {
          board.map((_, index) =>{
            return (
              <Square 
                key={index} 
                index={index} 
                updateBoard={updateBoard}
              >
                {board[index] }
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        

        <Square isSelected = {turn === TURNS.X} >
          {TURNS.X}
        </Square>

        <Square isSelected = {turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

        
      <WinnerModal winner = {winner}  resetBoard={resetBoard} />
    </main>
  )
}

export default App
