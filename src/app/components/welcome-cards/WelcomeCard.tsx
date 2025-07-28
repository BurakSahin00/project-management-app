import React, { ReactNode } from 'react'
import styles from './welcome-cards.module.css'
import Link from 'next/link'

type WelcomeCardProps = {
  title: string;
  path: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ title, path }) => {
  return (
    <Link href={path}>
      <div className={styles.card}>
        <h1 className={styles.cardText}>
          {title}
        </h1>
      </div>
    </Link>
  )
}

export default WelcomeCard;
