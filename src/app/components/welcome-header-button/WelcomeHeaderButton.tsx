import React from 'react'
import styles from './welcome-header.module.css'

type WelcomeHeaderButtonProps = {
  title: string;
  active?: boolean;
}

const WelcomeHeaderButton: React.FC<WelcomeHeaderButtonProps> = ({title, active}) => {
  return (
    <div className={`${styles.welcomeHeaderButton} ${active ? styles.active : ''}`}>
      <h5 className={styles.headerText}>{title}</h5>
    </div>
  )
}

export default WelcomeHeaderButton
