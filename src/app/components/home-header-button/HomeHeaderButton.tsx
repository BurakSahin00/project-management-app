import React from 'react'
import styles from './home-header-button.module.css';

type HomeHeaderButtonProps = { 
    name: string;
    active: boolean;
    icon: React.ReactNode;
}

const HomeHeaderButton: React.FC<HomeHeaderButtonProps> = ({ name, active, icon }) => {
  return (
    <div className={`${styles.homeHeaderButton} ${active ? styles.active : ''}`}>
      <div className={styles.iconContainer}>{icon}</div>
      {
        active && (<span className={styles.activeText}>{name}</span>)
      }
    </div>
  )
}

export default HomeHeaderButton
