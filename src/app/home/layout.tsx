'use client';
import React from "react";
import styles from './layout.module.css';
import SideNavigationBar from "../components/side-navigation-bar/SideNavigationBar";

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <div className={styles.container}>
      <SideNavigationBar />
      {children}
    </div>
  );
};

export default HomeLayout;