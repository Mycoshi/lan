import React, { useState } from 'react'
import styles from './Homepage.module.css'

import Card from '../card/Card.js'

const Homepage = (props) => {
  const currentfileArray = props.currentFileArray
  const fileArray = props.fileArray
  const title = props.fileTitle
  const current = props.current
  const videoHandler = props.videoHandler
  
  
  function findFirstJpgFileName(array) {
    const result = array.find(file => file.fileName && (file.fileName.endsWith('.jpg') || file.fileName.endsWith('.png')));
    return result ? result.fileData : null;
  }
  return (

    

    <div className={styles.HomepageContainer}>

       {fileArray.map((item, index) => (
        
        <Card
          key={index}
          Title={item[0]}
          current={current}
          currentArray={item}
          img={findFirstJpgFileName(fileArray[index])}
          videoHandler={videoHandler}
        />
          
      ))} 
    </div>
  )
}

export default Homepage 