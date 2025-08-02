'use client'

import React from 'react'
import SideBarElement from '../side-bar-element/SideBarElement'
import Link from 'next/link'
import styles from './side-navigation-bar.module.css'
import { usePathname } from 'next/navigation';
import { MdAccountBox } from "react-icons/md";
import { AiFillProject } from "react-icons/ai";
import { RiTeamFill } from "react-icons/ri";
import { FaRegCalendarCheck } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";


const navigationElements = [
  { name: 'Profile', icon: <MdAccountBox />, navigation: '/home/profile' },
  { name: 'Projects', icon: <AiFillProject />, navigation: '/home/projects' },
  { name: 'Teams', icon: <RiTeamFill />, navigation: '/home/teams' },
  { name: 'Calendar', icon: <FaRegCalendarCheck />, navigation: '/home/calendar' },
  { name: 'Settings', icon: <IoMdSettings />, navigation: '/home/settings' },
  { name: 'Logout', icon: <IoLogOutSharp />, navigation: '/home/logout' }
]

const SideNavigationBar: React.FC = () => {
  const pathname = usePathname();
  return (
    <div className={styles.container}>
      {navigationElements.map((element) => (
        <Link key={element.name} href={element.navigation}>
          <SideBarElement
            icon={element.icon}
            name={element.name}
            active={pathname === element.navigation} />
        </Link>
      ))}
    </div>
  )
}

export default SideNavigationBar
