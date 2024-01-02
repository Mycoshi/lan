import React, { useState, useEffect,  useCallback} from 'react'
import styles from './Showpage.module.css'
import VideoPosterComponent from './VideoPosterComponent';


const ShowPage = (props) => {
  const [movieData, setMovieData] = useState(props.movieArray)
  const currentFileArray = props.currentFileArray
  const current = props.current
  const setfilepath = props.fileChangeHandler
  const indexSetter = props.fileIndexHandler

  function findFirstJpgFileName(array) {
    const result = current.find(file => file.fileName && (file.fileName.endsWith('.jpg') || file.fileName.endsWith('.png')));
    return result ? result.fileData : null;
  }
    // this searches the array for an image matching that value
    const imgData = currentFileArray.filter((file) => file.fileType && file.fileType.includes('image'))

    function handleImageSetter() {
      try {
      const imgsetter = imgData[0]
      return imgsetter.fileData
    } catch (e) {
      console.log(e)
    }}
  
  
  return (
    <div>      
      <ul className={styles.ShowGrid}>
        {movieData.map((movieData, index) => (
          <div key={index} className={styles.cursor} onClick={() => {
            current(3)
            setfilepath(movieData)
            indexSetter(index)
          }}>
          <li className={styles.ShowItem} key={index}>
            <img className={styles.img} src={(handleImageSetter(currentFileArray))} alt={'Image'} /> 
            <p>Episode {movieData.fileName.replace(/\.mp4$/, '')}</p>
          </li>
          </div>
        ))}





      </ul>
    </div>
  )
}

export default ShowPage