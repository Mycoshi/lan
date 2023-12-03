import React, { useState } from 'react'
import styles from './Card.module.css'

const SeasonCard = (props) => {
  const current = props.current
  const img = props.img
  const title = props.title
  const videoListHandler = props.videoHandler
  const movieArray = props.movieArray


  function handleSeasonChoice(title) {
    const filteredEpisodes = movieArray.filter((episode) => {
      const splitPath = episode.filePath.split('/');
      const secondToLastSegment = splitPath[splitPath.length - 2];
      console.log(secondToLastSegment)
      // Check for an exact match with props.title before the last slash
      return secondToLastSegment === props.title;
    });
    videoListHandler(filteredEpisodes)
    current(2)
  } 

  return (
    
    <div className={styles.cardBx} onClick={handleSeasonChoice}>
    <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardInfo}>
      </div>
      <img className={styles.cardImg} alt='SeriesIMG' src={img} />
  </div>  )
}

export default SeasonCard