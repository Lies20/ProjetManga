import React from 'react'
import image from '../../img/image.jpg'
import './banner.css'

function Banner() {
  return (
      <div>
          <h1>
          <img className='banniere' src={image} alt='banniere'/>
          </h1>

    </div>
  )
}

export default Banner