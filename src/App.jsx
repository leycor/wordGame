import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Fichas
const listToken = ["t", "x", "o", "m", "i", "l", "b", "u", "c", "a"]

// Palabras disponibles con las fichas
const avaible = [
  'toma',
  'toxica',
  'tubo',
  'taco',
  'tabu',
  'taxi',
  'moca',
  'mota',
  'malo',
  'mio',
  'loca',
  'loco',
  'lima',
  'lomo',
  'loma',
  'lobo',
  'loba',
  'loto',
  'boca',
  'bota',
  'bioma',
  'cabo',
  'cubo',
  'cola',
  'coma',
  'amo',
]




const App = () => {
  const [ tokens, setTokens ] = React.useState(listToken)
  const [word, setWord] = React.useState([])
  const [ wordsAvaible, setWordsAvaible ] = React.useState(avaible)
  const [ point, setPoint ] = React.useState(0)

  // usar una ficha para jugar
  const handleRemoveListToken = (tokenRemove) => {
    const positionForPlay = ['left', 'right']
    const randomPosition = positionForPlay[ Math.floor( Math.random() * positionForPlay.length ) ]

    const newListToken = tokens.filter( token => token !== tokenRemove)
    setTokens(newListToken)
    randomPosition === 'right' ? setWord([...word,tokenRemove]) : setWord([tokenRemove,...word])
  }

  // Remover una de las letras
  const handleRemoveLetter = (letterRemove) => {
    const newWords = word.filter( letter => letter !== letterRemove)
    setWord(newWords)
    setTokens([...tokens, letterRemove])
  }

  // Resetear el juego
  const handleResetGame = () => {
    setTokens(listToken)
    setWord([])
    setPoint(0)
    toast("Reset game");
  }
  

  // Escucha cuando una palabra coincide con las disponibles y da puntos
  React.useEffect( ()=> {
    const currentWord = word.join('')
    if(wordsAvaible.includes(currentWord)){
      const points = currentWord.length
      const newWordsAvaible = wordsAvaible.filter( word => word !== currentWord )
      setPoint(point + points)
      setWordsAvaible(newWordsAvaible)
      toast('Felicidades, has encontrado una palabra')
    }
  },[word] )

  // Escucha cuando tienes 20 puntos y ganas
  React.useEffect(()=>{ 
    if(point >= 20){
      toast('Felicidades, ganaste el juego.')
    }
  },[point])
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-50'>
      <p className='p-5 font-bold font-mono'>Points: {point}/20</p>
      <div className='flex gap-5 flex-wrap justify-center mb-20'>
        {
          tokens.map( token => (
            <button onClick={()=> handleRemoveListToken(token)}  key={token} className='text-5xl text-gray-700 font-bold flex justify-center items-center border border-gray-400 shadow-lg uppercase min-w-[8rem] min-h-[11rem] hover:text-red-500'>{token}</button>
          ))
        }
      </div>


      <div className='flex flex-col gap-8 justify-center'>
        <div className='flex gap-3 justify-center'>
          {
            word.map( (letter, index) => (
              <div
              onClick={ index === 0 || index === word.length - 1 ? () => handleRemoveLetter(letter) : null } 
              key={letter} 
              className={`text-2xl ${ index === 0  && 'text-red-500 cursor-pointer'} ${ index === word.length - 1  && 'text-red-500 cursor-pointer'}  font-semibold flex justify-center items-center border border-gray-400 shadow-lg uppercase p-3`}>
                {letter}
              </div>
            ))
          }
        </div>

          
          {
            word.length > 0 &&
            <button onClick={handleResetGame} className='p-3 font-medium bg-red-500 text-white uppercase'>Reset</button>
          }
      </div>
      <ToastContainer />
    </div>
  )
}

export default App