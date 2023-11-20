import React, { useState} from 'react'
import styles from './Card.module.css'
import logo from '../../assets/lanlogo.png'

const Card = (props) => {
  const current = props.current
  const currentArray = props.currentArray
  const img = props.img
  const videoListHandler = props.videoHandler
  const handleClick = () => {
    const hasDepthGreaterThan3 = currentArray.some(item => item.depth > 3);
    if (hasDepthGreaterThan3) {
      current(4)
    }
    else  {
      current(2)
    }

    videoListHandler(currentArray)
  }
  console.log(currentArray)
  return (
    
    <div className={styles.cardBx} onClick={(handleClick)}>
    <div className={styles.cardTitle}>{props.Title}</div>
    
      <div className={styles.cardInfo}>
      </div>
      <img className={styles.cardImg} alt='SeriesIMG' src={img} />
  </div>  )
}

export default Card