import React, { useState} from 'react'
import styles from './Card.module.css'
import logo from '../../assets/lanlogo.png'

const Card = (props) => {
  const current = props.current
  const handleClick = () => {
    current(2)
  }
  return (
    
    <div className={styles.cardBx} onClick={handleClick}>
    <div className={styles.cardTitle}>{props.Title}</div>
      <div className={styles.cardInfo}>
      </div>
      <img className={styles.cardImg} alt='SeriesIMG' src={props.Img} />
  </div>  )
}

export default Card