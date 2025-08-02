import React from 'react'
import styles from './page.module.css'
import WelcomeCard from './components/welcome-cards/WelcomeCard'
import GetStartedButton from './components/get-started-button/GetStartedButton';
import Link from 'next/link';

const cards = [
  { title: 'About Application', path: '/navigation/AboutApplication' },
  { title: 'How To Use?', path: '/navigation/HowToUse' },
  { title: 'FAQ', path: '/navigation/FAQ' },
  { title: 'Contact Us', path: '/navigation/ContactUs' }
];

const Home: React.FC = () => {
  return (
    <div className={styles.background}>
      <div className={styles.textColor}>
        <h1 className={styles.headerFont}>Project Management App</h1>
        <h4 className={styles.italic}>The easiest way for managing projects</h4>
      </div>
      <div className={styles.cardList}>
        {cards.map((card, index) => (
          <WelcomeCard key={index} title={card.title} path={card.path} />
        ))}
      </div>
      <Link href='/navigation/GetStarted'>
        <GetStartedButton />
      </Link>
      <h5 className={styles.italic}>All Rights Reserved</h5>
    </div>
  )
}

export default Home
