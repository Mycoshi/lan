import React, { useState } from 'react'
import styles from './Homepage.module.css'

import Card from '../card/Card.js'

const Homepage = (props) => {

  const title = props.fileTitle
  const current = props.current
  const img = props.img
  return (
    <div className={styles.HomepageContainer}>      
      <Card Title={title} current={current} Img={img}  />
    </div>
  )
}

export default Homepage 