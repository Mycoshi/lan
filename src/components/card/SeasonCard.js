import React, { useState} from 'react'
import styles from './Card.module.css'
import logo from '../../assets/lanlogo.png'

const SeasonCard = (props) => {
  const current = props.current
  const currentArray = props.currentArray
  const img = props.img
  const title = props.title

  return (
    
    <div className={styles.cardBx} onClick={() => {
    }}>
    <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardInfo}>
      </div>
      <img className={styles.cardImg} alt='SeriesIMG' src={img} />
  </div>  )
}

export default SeasonCard