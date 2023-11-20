import React from 'react'
import styles from './Showpage.module.css'
import VideoPosterComponent from './VideoPosterComponent';


const ShowPage = (props) => {
  const movieData = props.movieArray
  const current = props.current
  const setfilepath = props.fileChangeHandler
  const indexSetter = props.fileIndexHandler

  return (
    <div>      
      <ul className={styles.ShowGrid}>



        {movieData.map((movieData, index) => (
          <div key={index} className={styles.cursor} onClick={() => {
            current(3)
            setfilepath(movieData)
            indexSetter(index)
          }}>
          <li className={styles.ShowItem} key={index}>Episode {movieData.fileName}
          </li>
          </div>
        ))}





      </ul>
    </div>
  )
}

export default ShowPage