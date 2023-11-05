import React from 'react'
import styles from './Homepage.module.css'

import Card from '../card/Card.js'

const Homepage = (props) => {

  const data = props.fileData


  return (
    <div className={styles.HomepageContainer}>
      <Card Title={data} />
    </div>
  )
}

export default Homepage