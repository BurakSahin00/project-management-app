'use client'

import React from "react";
import { usePathname } from "next/navigation";
import WelcomeHeader from "../components/welcome-header/WelcomeHeader";

const WelcomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const pathname = usePathname();
  return (
    <div>
      {!(pathname === "/navigation/GetStarted") && <WelcomeHeader />}
      {children}
    </div>
  );
};

export default WelcomeLayout;