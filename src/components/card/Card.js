import React from 'react'
import styles from './Card.module.css'
import logo from '../../assets/lanlogo.png'


const Card = (props) => {
  return (
    <div className={styles.cardBx}>
    <div className={styles.cardTitle}>{props.Title}</div>
      <div className={styles.cardInfo}>
      </div>
      <img className={styles.cardImg} alt='' src={logo} />
  </div>  )
}

export default Card