
import React from "react";
import SideNavigationBar from "../components/side-navigation-bar/SideNavigationBar";


const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  
  return (
    <div>
      <SideNavigationBar />
      {children}
    </div>
  );
};

export default HomeLayout;