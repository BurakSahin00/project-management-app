'use client'

import React from "react";
import WelcomeHeader from "../components/welcome-header/WelcomeHeader";

const WelcomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <WelcomeHeader />
      {children}
    </div>
  );
};

export default WelcomeLayout;