import React from 'react'
import SideNavigationBar from '../components/side-navigation-bar/SideNavigationBar'
import styles from './page.module.css'

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <SideNavigationBar />
    </div>
  )
}

export default Home
