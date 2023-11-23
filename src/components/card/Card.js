import React, { useState } from 'react'
import styles from './Card.module.css'
import logo from '../../assets/lanlogo.png'

const Card = (props) => {
  const current = props.current
  const currentArray = props.currentFileArray
  const img = props.img
  const videoListHandler = props.videoHandler
  const fileArrayHandler = props.fileArrayHandler
  const movieArray = props.movieArray
  const item = props.currentItem

  const handleClick = () => {
    fileArrayHandler(item)
    videoListHandler(item)
    console.log(movieArray)
    const pageChoice = movieArray.some(movie => movie.depth > 3) ? 2 : 4;
    current(pageChoice);
  };
  return (
    
    <div className={styles.cardBx} onClick={(handleClick)}>
    <div className={styles.cardTitle}>{props.Title}</div>
    
      <div className={styles.cardInfo}>
      </div>
      <img className={styles.cardImg} alt='SeriesIMG' src={img} />
  </div>  )
}

export default Card