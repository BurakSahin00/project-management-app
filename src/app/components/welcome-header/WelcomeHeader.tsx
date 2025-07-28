'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import WelcomeHeaderButton from '../welcome-header-button/WelcomeHeaderButton'
import styles from './welcome-header.module.css'

const HeaderButtons = [
    { title: 'About Application', path: '/AboutApplication' },
    { title: 'How To Use?', path: '/HowToUse' },
    { title: 'FAQ', path: '/FAQ' },
    { title: 'Contact Us', path: '/ContactUs' }
]

const WelcomeHeader: React.FC = () => {

    const pathname = usePathname();
  return (
    <div className={styles.headerContainer}>
      {
        HeaderButtons.map((button, index) => (
          <WelcomeHeaderButton
            key={index}
            title={button.title}
            active={pathname === button.path}
          />
        ))
      }
    </div>
  )
}

export default WelcomeHeader
