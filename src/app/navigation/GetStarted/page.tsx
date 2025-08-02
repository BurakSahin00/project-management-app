import React from 'react'
import styles from './page.module.css'

const GetStarted: React.FC = () => {
  return (
    <div className={styles.master}>
      <div className={styles.container}>
      <div className={styles.mainText}>
        <h2>Login and Start</h2>
        <p>Login to your account to start using our services.</p>
      </div>
      <div className={styles.inputLabel}>
        <label htmlFor="email">Email Address</label>
        <input className={styles.inputBox} type="email" name="Email" id="email" placeholder="Email" required />
      </div>
      <div className={styles.inputLabel}>
        <label htmlFor="password">Password</label>
        <input className={styles.inputBox} type="password" name="Password" id="password" placeholder='Password' required/>
      </div>
      <input type="button" value="Login"/>
    </div>
    </div>
  )
}

export default GetStarted
