'use client';
import React from "react";
import styles from './layout.module.css';
import SideNavigationBar from "../components/side-navigation-bar/SideNavigationBar";
import HomeHeader from "../components/home-header/HomeHeader";
import ChatbotModal from "@/components/ChatbotModal";
const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <div className={styles.container}>
      <HomeHeader />
      {children}
      <ChatbotModal />
    </div>
  );
};

export default HomeLayout;