'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import WelcomeHeaderButton from '../welcome-header-button/WelcomeHeaderButton'
import styles from './welcome-header.module.css'
import Link from 'next/link'

const HeaderButtons = [
    { title: 'About Application', path: '/navigation/AboutApplication' },
    { title: 'How To Use?', path: '/navigation/HowToUse' },
    { title: 'FAQ', path: '/navigation/FAQ' },
    { title: 'Contact Us', path: '/navigation/ContactUs' }
]

const WelcomeHeader: React.FC = () => {

    const pathname = usePathname();
    return (
        <div className={styles.headerContainer}>
            {
                HeaderButtons.map((button, index) => (
                    <Link href={button.path} key={index}>
                        <WelcomeHeaderButton
                            title={button.title}
                            active={pathname === button.path}
                        />
                    </Link>
                ))
            }
        </div>
    )
}

export default WelcomeHeader
