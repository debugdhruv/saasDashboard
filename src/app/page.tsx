// page.tsx
"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import RightSidebar from "@/components/RightSidebar";

export default function HomePage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Sidebar isSidebarCollapsed={isSidebarCollapsed} />
      
      <TopBar 
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isRightSidebarOpen={isRightSidebarOpen}
        onToggleRightSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)}/>
      
      <RightSidebar 
        isRightSidebarOpen={isRightSidebarOpen}/>
      
      {/* Main content area */}
      <main className={`transition-all duration-300 ease-out pt-16 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      } ${
        isRightSidebarOpen ? 'mr-80' : 'mr-0'
      }`}>
        <div className="pl-10 pt-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            eCommerce
          </h1>
        </div>
      </main>
    </div>
  );
}