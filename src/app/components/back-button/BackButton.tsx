import React from 'react'
import { FaArrowCircleLeft } from "react-icons/fa";
import styles from './back-button.module.css'


const BackButton: React.FC = () => {
  return (
    <div className={styles.button}>
      <FaArrowCircleLeft className={styles.icon}/>
    </div>
  )
}

export default BackButton
