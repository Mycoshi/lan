import React, { useState } from 'react'
import styles from './SeasonPage.module.css'

import SeasonCard from '../card/SeasonCard';

const SeasonPage = (props) => {
  const currentFileArray = props.currentFileArray
  const title = props.fileTitle
  const current = props.current
  const videoHandler = props.videoListHandler
  const [imageSetter, setImageSetter] = useState([])
  const fileArrayHandler = props.fileArrayHandler
  
  const seasonFilter = currentFileArray
  .map((file) => file.filePath && (file.filePath.split('/')))

  function handleImageSetter(subString) {
    const imgData = currentFileArray.find((file) => file.fileName === subString)
    return imgData.fileData
  }
 console.log(currentFileArray)
  return (

    

    <div className={styles.SeasonPageContainer}>
      <p>Season Page</p>
      {seasonFilter.map((season, index) => season && (
        <SeasonCard
        key={index}
        current={current}
        title={season[season.length - 2]}
        img={handleImageSetter(season[season.length - 1])}
        videoHandler={videoHandler}
        currentFileArray={currentFileArray}
        />
      ))}

    </div>
  )
}

export default SeasonPage