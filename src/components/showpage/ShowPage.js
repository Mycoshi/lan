import React from 'react'
import styles from './Showpage.module.css'


const ShowPage = (props) => {

  const filepath = props.filePath



  return (
    <div className={styles.showPageContainer}>
      <div className='showgrid'>
        <video src={filepath} controls></video>
      </div>
    </div>
  )
}

export default ShowPage