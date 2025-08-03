import React from 'react'
import styles from './side-bar-element.module.css'

type SideBarElementProps = {
    name: string;
    icon: React.ReactNode;
    active: boolean;
    altElements?: String[];
}

const SideBarElement: React.FC<SideBarElementProps> = ({ name, icon, active, altElements }) => {
  return (
    <div className={`${styles.sideBarElement} ${active ? styles.active : ''}`}>
        {icon}
        <h5 className={styles.name}>{name}</h5>
    </div>
  )
}

export default SideBarElement
