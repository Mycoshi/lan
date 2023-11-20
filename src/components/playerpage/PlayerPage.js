import {React, useState } from 'react'
import styles from './PlayerPage.module.css'


const PlayerPage = (props) => {
  let [fileObject, setObject] = useState(props.fileData)
  let movieArray = props.movieArray
  let [index, setIndex] = useState(props.fileIndex)
  let Episode = fileObject.fileName

  const handleNext = () => {
    const nextIndex = index + 1
    setObject((prevFileData) => {
      return movieArray[nextIndex]; // Return the new state
    });
    setIndex(index + 1)
  }
  const handlePrev = () => {
    const prevIndex = index - 1
    setObject((prevFileData) => {
      return movieArray[prevIndex]; // Return the new state
      
    });
  }


  return (
      <div className={styles.showContainer}>
        <video key={fileObject.fileData} style={{height:'75%', width:'98%'}} src={fileObject.fileData} controls ></video>


        <div className={styles.uiContainer}>

        {<button className={styles.button64} onClick = {handleNext}>Next Episode</button>}
        
        <h2>{Episode}</h2>

        {<button className={styles.button64} onClick = {handlePrev}>Previous Episode</button>}
        </div>
      </div>
  )
}

export default PlayerPage;