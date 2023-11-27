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
  const movieArray = props.movieArray



// this slices the filepath into everything but the overhead folders and the file itself
  const stringSplit = currentFileArray
  .map((file) => file.filePath && (file.filePath.split('/')))
  let stringSplitPurify = stringSplit.filter(file => file !== undefined)
  const modifiedStringSplitPurify = stringSplitPurify
  .map(subArray => {
    return  subArray.slice(2, -1);
  })
  .filter ((file) => file.length > 0);

  // this creates a set of unique values
  const seasonFilter= []
  let seasonFilter1 = [].concat(...modifiedStringSplitPurify)
  const seasonSet = new Set()
  seasonFilter1.forEach(string => {
    seasonSet.add(string)
  })
  seasonFilter.push(...seasonSet)
  

  // this searches the array for an image matching that value
  const imgData = currentFileArray.filter((file) => file.fileData && file.fileData.includes('data:image'))

  function handleImageSetter(subString) {
    try {
    const imgsetter = imgData.find((file) => file.filePath.includes(subString));
    return imgsetter.fileData
  } catch (e) {
    console.log(e)
  }}
    
  return (

    

    <div className={styles.SeasonPageContainer}>
      <p>Season Page</p>
      <button onClick = {() => (console.log(imgData))}>Data</button>
      {seasonFilter.map((season, index) => season && (
        <SeasonCard
        key={index}
        current={current}
        movieArray={movieArray}
        title={season}
        img={handleImageSetter(season)}
        videoHandler={videoHandler}
        currentFileArray={currentFileArray}
        />
        
      ))}

    </div>
  )
}

export default SeasonPage