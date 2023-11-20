import React, { useState } from 'react'
import styles from './SeasonPage.module.css'

import SeasonCard from '../card/SeasonCard';

const SeasonPage = (props) => {
  const currentFileArray = props.currentFileArray
  const title = props.fileTitle
  const [imageSetter, setImageSetter] = useState([])
  
  
  const seasonFilter = currentFileArray
  .map((file) => file.filePath && (file.filePath.split('/')))

  function handleImageSetter(subString) {
    const imgData = currentFileArray.find((file) => file.fileName === subString)
    return imgData.fileData
  }
 
  return (

    

    <div className={styles.SeasonPageContainer}>
      <p>Season Page</p>
      <button onClick = {() => (console.log(seasonFilter))}>Data</button>
      {seasonFilter.map((season, index) => season && (
        <SeasonCard
        key={index} 
        title={season[season.length - 2]}
        img={handleImageSetter(season[season.length - 1])}
        />
      ))}

    </div>
  )
}

export default SeasonPage