'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MdAccountBox } from "react-icons/md";
import { AiFillProject } from "react-icons/ai";
import { RiTeamFill } from "react-icons/ri";
import { FaRegCalendarCheck } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";

const HeaderComponents = [
    {
        icon: <MdAccountBox />,
        name: "Account",
        link: "/home/profile"
    },
    {
        icon: <AiFillProject />,
        name: "Projects",
        link: "/home/projects"
    },
    {
        icon: <RiTeamFill />,
        name: "Team",
        link: "/home/teams"
    },
    {
        icon: <FaRegCalendarCheck />,
        name: "Calendar",
        link: "/home/calendar"
    },
    {
        icon: <IoMdSettings />,
        name: "Settings",
        link: "/home/settings"
    }
]


import HomeHeaderButton from '../home-header-button/HomeHeaderButton';
import styles from './home-header.module.css';

const HomeHeader: React.FC = () => {
  const pathname = usePathname();
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLeft}>
        {HeaderComponents.filter(btn => btn.name !== 'Account' && btn.name !== 'Settings').map((btn, idx) => (
          <Link key={btn.name} href={btn.link} style={{ textDecoration: 'none' }}>
            <HomeHeaderButton name={btn.name} active={pathname === btn.link} icon={btn.icon} />
          </Link>
        ))}
      </div>
      <div className={styles.headerCenter}>
        <img src="/mlipmp.jpg" alt="Logo" className={styles.headerLogo} />
      </div>
      <div className={styles.headerRight}>
        <Link href="/home/profile" style={{ textDecoration: 'none' }}>
          <HomeHeaderButton name="Account" active={pathname === '/home/profile'} icon={<MdAccountBox />} />
        </Link>
        <Link href="/home/settings" style={{ textDecoration: 'none' }}>
          <HomeHeaderButton name="Settings" active={pathname === '/home/settings'} icon={<IoMdSettings />} />
        </Link>
        <Link href="/home/logout" style={{ textDecoration: 'none' }}>
          <HomeHeaderButton name="Logout" active={pathname === '/home/logout'} icon={<IoLogOutSharp />} />
        </Link>
      </div>
    </div>
  )
}

export default HomeHeader
