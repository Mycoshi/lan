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
    if (currentArray != null) {
      const pageChoice = currentArray.some(file => file && file.depth > 3) ? 4 : 2;// this is not always firing, and can put the wrong clicks at seasons page assuming to do with length of the array? UPDATE seems to sometimes fire on the previous array maybe doesnt update fast enough do we need a buffer?
      current(pageChoice);
    }
    else {
      console.log('No array set')
    }
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