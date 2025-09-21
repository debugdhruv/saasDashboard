"use client";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

interface TopBarProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isRightSidebarOpen: boolean;
  onToggleRightSidebar: () => void;
}

export default function TopBar({ 
  isSidebarCollapsed, 
  onToggleSidebar, 
  isDarkMode, 
  onToggleDarkMode,
  isRightSidebarOpen,
  onToggleRightSidebar
}: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header 
      className={clsx(
        "fixed top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ease-out z-40 h-16",
        isSidebarCollapsed ? "left-16" : "left-64",
        isRightSidebarOpen ? "right-80" : "right-0"
      )}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - Menu toggle and breadcrumbs */}
        <div className="flex items-center gap-4">
          {/* Menu Toggle Button */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Image
              src="/topbar/Sidebar.svg"
              alt="Menu"
              width={20}
              height={20}
              className="text-gray-600 dark:text-gray-400"
            />
          </button>

          {/* Star Icon */}
          <button className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Image
              src="/topbar/Star.svg"
              alt="Star"
              width={20}
              height={20}
              className="text-gray-600 dark:text-gray-400"
            />
          </button>

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Dashboards</span>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <span className="text-gray-900 dark:text-white font-medium">Default</span>
          </nav>
        </div>

        {/* Right side - Search and actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Image
                src="/topbar/Search.svg"
                alt="Search"
                width={14}
                height={14}
                className="text-gray-400 dark:text-gray-500"
              />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={clsx(
                "pl-8 pr-12 py-2 w-48 rounded-lg border transition-all duration-200 focus:ring-0 focus:border-0",
                "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700",
                "text-gray-900 dark:text-white placeholder-gray-500 text-xs dark:placeholder-gray-400"
              )}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-sm text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                ⌘/
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Image
                src="/topbar/Sun.svg"
                alt={isDarkMode ? "Light Mode" : "Dark Mode"}
                width={20}
                height={20}
                className="text-gray-600 dark:text-gray-400"
              />
            </button>

            {/* History */}
            <button className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Image
                src="/topbar/ClockCounterClockwise.svg"
                alt="History"
                width={20}
                height={20}
                className="text-gray-600 dark:text-gray-400"
              />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={onToggleRightSidebar}
                className={clsx(
                  "p-2 rounded-lg transition-all duration-200 relative hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                )}
              >
                <Image
                  src="/topbar/Bell.svg"
                  alt="Notifications"
                  width={20}
                  height={20}
                  className={clsx(
                    "transition-colors duration-200 text-gray-600 dark:text-gray-400"
                  )}
                />
              </button>
            </div>

            {/* Sidebar Toggle (right sidebar icon) */}
            <button
              onClick={onToggleRightSidebar}
              className={clsx(
                "p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
              )}
            >
              <Image
                src="/topbar/Sidebar.svg"
                alt="Sidebar"
                width={20}
                height={20}
                className={clsx(
                  "transition-colors duration-200"
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}