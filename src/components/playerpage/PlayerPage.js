import {React, useState } from 'react'
import styles from './PlayerPage.module.css'


const PlayerPage = (props) => {
  let [filePath, setFilePath] = useState(props.filePath)
  let movieArray = props.movieArray
  let [index, setIndex] = useState(props.fileIndex)
  let Episode = index + 1

  const handleNext = () => {
    const nextIndex = index + 1
    setFilePath((prevFilePath) => {
      console.log(prevFilePath); // This will log the previous state
      return movieArray[nextIndex].filePath; // Return the new state
    });
    setIndex(index + 1)
  }
  const handlePrev = () => {
    const prevIndex = index - 1
    setFilePath((prevFilePath) => {
      console.log(prevFilePath); // This will log the previous state
      return movieArray[prevIndex].filePath; // Return the new state
    });
    setIndex(index - 1)
  }


  return (
      <div className={styles.showContainer}>
        
        <video key={filePath} style={{height:'75%', width:'98%'}} src={filePath} controls ></video>


        <div className={styles.uiContainer}>
        {(Episode < movieArray.length) && <button className={styles.button64} onClick = {handleNext}>Next Episode {Episode + 1}</button>}
        <h2>{Episode}</h2>
        {(Episode > 1) && <button className={styles.button64} onClick = {handlePrev}>Previous Episode {Episode - 1}</button>}
        </div>
      </div>
  )
}

export default PlayerPage;