import React, { useState } from 'react'
import styles from './Homepage.module.css'

import Card from '../card/Card.js'

const Homepage = (props) => {

  const data = props.fileData
  const current = props.current
  return (
    <div className={styles.HomepageContainer}>      
      <Card Title={data} current={current}  />
    </div>
  )
}

export default Homepage 