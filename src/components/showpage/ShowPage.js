import React from 'react'
import styles from './Showpage.module.css'
import VideoPosterComponent from './VideoPosterComponent';


const ShowPage = (props) => {

  const data = props.fileArray;
  const movieData = data.filter((file) => file.filePath.includes('video/mp4'));
  const timeInSeconds = 420;

  const current = props.current
  const setfilepath = props.videoHandler
  const indexSetter = props.fileIndexHandler


  return (
    <div>      
      <ul className={styles.ShowGrid}>



        {movieData.map((movieData, index) => (
          <div key={index} className={styles.cursor} onClick={() => {
            current(3)
            setfilepath(movieData.filePath)
            indexSetter(index)
          }}>
          <li className={styles.ShowItem} key={index}>Episode {index + 1}
          </li>
          </div>
        ))}





      </ul>
    </div>
  )
}

export default ShowPage