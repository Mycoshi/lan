import React, { useState } from 'react'
import styles from './Homepage.module.css'

import Card from '../card/Card.js'

const Homepage = (props) => {
  const {
    currentFileArray,
    fileArray,
    fileTitle,
    current,
    videoHandler,
    fileArrayHandler,
    movieArray,
    filteredTitles, // Include filteredTitles as a prop
  } = props;

  
  function findFirstJpgFileName(array) {
    const result = array.find(file => file.fileName && (file.fileName.endsWith('.jpg') || file.fileName.endsWith('.png')));
    return result ? result.fileData : null;
  }


   // Filter the fileArray based on the filteredTitles

  if (filteredTitles != null ) return (

    <div className={styles.HomepageContainer}>
      <div className={styles.HomepageGrid}>
       {filteredTitles.map((item, index) => (
          <Card
            key={index}
            Title={item[0]}
            current={current}
            currentItem={item}
            currentFileArray={currentFileArray}
            img={findFirstJpgFileName(fileArray[index])}
            videoHandler={videoHandler}
            fileArrayHandler={fileArrayHandler}
            movieArray={movieArray}
          />
      ))} 
      </div>
    </div>
  );
  else return (
    <>
     <div className={styles.HomepageContainer}>
      <div className={styles.HomepageGrid}>
       {fileArray.map((item, index) => (
        
        <Card
          key={index}
          Title={item[0]}
          current={current}
          currentItem={item}
          currentFileArray={currentFileArray}
          img={findFirstJpgFileName(fileArray[index])}
          videoHandler={videoHandler}
          fileArrayHandler={fileArrayHandler}
          movieArray={movieArray}
        />
          
      ))} 
      </div>
    </div>
    </>
  )  
}

export default Homepage 