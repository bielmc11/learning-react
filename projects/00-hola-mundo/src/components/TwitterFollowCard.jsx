import { useState } from 'react'

import './TwitterFollorCard.css'

export  function TwitterfollowCard({formatUserName ,userName, name='uknow', initialIsFollow}) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollow)

    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }

    const text = isFollowing ? 'Siguiendo ' : 'Seguir'
    const buttonClassNme = isFollowing
        ? 'tw-followCard-button is-following'
        : 'tw-followCard-button' 

    return (
    <article className='tw-followCard'>
        <header className='tw-followCard-header'>
            <img className='tw-followCard-img' src={`https://unavatar.io/${userName}`} alt="Imagen de perfil" />
            <div className='tw-followCard-info'>
                <strong className='tw-followCard-name'> {name}</strong>
                {<span className='tw-followCard-username'> {formatUserName(userName)} </span>}
            </div>
        </header>


        <aside className='tw-followCard-aside'>
            <button className= {buttonClassNme } onClick={handleClick} >
                 <span className='tw-followCard-buttonText'>{text}</span>
                 <span className='tw-followCard-stopFollow' >Dejar de seguir</span>
            </button>
        </aside>
    </article>
)
}