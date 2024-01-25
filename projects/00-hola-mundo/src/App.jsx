import { useState } from 'react'
import './App.css'
import { TwitterfollowCard } from './components/TwitterFollowCard'



const users = [
  {
    userName: 'midudev',
    name: 'Miguel Ángel Durán',
    isFollowing: true
  },
  {
    userName: 'pheralb',
    name: 'Pablo H.',
    isFollowing: false
  },
  {
    userName: 'PacoHdezs',
    name: 'Paco Hdez',
    isFollowing: true
  },
  {
    userName: 'TMChein',
    name: 'Tomas',
    isFollowing: false
  }
]


export default function  App() {
  //Paso una funcion como prop
  const formatUserName = (userName) => `@${userName}`
  const [numero, setNumero] = useState(0)

  const handleNumero = (otro) =>{
    setNumero(numero + 1)
  }
  
  
  return (
    <section className='App'>
      {
        users.map(users =>{
          //La constante de abajo podria ir direactamente en users
          const {userName, name, isFollowing } = users
          return (
            <TwitterfollowCard
              key={userName}
              userName={userName}
              formatUserName={formatUserName}
              name = {name}
              initialIsFollow={isFollowing}
             />
          )
          
        })
      }

    </section>
  )
}

