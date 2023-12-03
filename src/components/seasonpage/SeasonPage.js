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

    // checks for videos in the folders and shows folder if it finds them
    const rootMovieFilter = movieArray.map(file => {
      const splitPath = file.filePath.split('/')
      if (splitPath.length >= 2) {
        // Return the second-to-last element
        return splitPath[splitPath.length - 2];
      } else {
        // Handle cases where splitPath has fewer than two elements
        return undefined; // or any other value you want to use for such cases
      }
    });
    const uniqueValues = rootMovieFilter.filter(value => value !== undefined);
    const uniqueSet = new Set(uniqueValues);
    const seasons =  [...uniqueSet]

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
      {seasons.map((season, index) => season && (
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