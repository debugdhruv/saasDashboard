"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default function HomePage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Sidebar isSidebarCollapsed={isSidebarCollapsed} />
      <TopBar 
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
      
      {/* Main content area */}
      <main className={`transition-all duration-300 ease-in-out pt-16 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        {/* Your dashboard content goes here */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard Content
          </h1>
        </div>
      </main>
    </div>
  );
}