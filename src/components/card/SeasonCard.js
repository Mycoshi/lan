import React, { useState } from 'react'
import styles from './Card.module.css'

const SeasonCard = (props) => {
  const current = props.current
  const currentFileArray = props.currentFileArray
  const img = props.img
  const title = props.title
  const videoListHandler = props.videoHandler


  return (
    
    <div className={styles.cardBx} onClick={'handleSeasonClick(title)'}>
    <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardInfo}>
      </div>
      <img className={styles.cardImg} alt='SeriesIMG' src={img} />
  </div>  )
}

export default SeasonCard