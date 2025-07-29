import React from 'react'
import styles from './get-started-button-header.module.css';

type GetStartedHeaderButtonProps = {
  active?: boolean;
}

const GetStartedHeaderButton: React.FC<GetStartedHeaderButtonProps> = ({active}) => {
  return (
    <div className={`${styles.button} ${active ? styles.active : ''}`}>
      <h5 className={styles.headerText}>Get Started</h5>
    </div>
  )
}

export default GetStartedHeaderButton
