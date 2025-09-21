"use client";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

interface TopBarProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function TopBar({ 
  isSidebarCollapsed, 
  onToggleSidebar, 
  isDarkMode, 
  onToggleDarkMode 
}: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header 
      className={clsx(
        "fixed top-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ease-out z-40",
        isSidebarCollapsed ? "left-16" : "left-64"
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
                width={16}
                height={16}
                className="text-gray-400 dark:text-gray-500"
              />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={clsx(
                "pl-10 pr-12 py-2 w-80 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700",
                "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              )}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">
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
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 relative"
              >
                <Image
                  src="/topbar/Bell.svg"
                  alt="Notifications"
                  width={20}
                  height={20}
                  className="text-gray-600 dark:text-gray-400"
                />
                {/* Notification dot */}
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 text-sm">🐛</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 dark:text-white">You have a bug that needs...</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">9 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <span className="text-green-600 dark:text-green-400 text-sm">👤</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 dark:text-white">New user registered</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">9 minutes ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Toggle (duplicate functionality for convenience) */}
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Image
                src="/topbar/Sidebar.svg"
                alt="Sidebar"
                width={20}
                height={20}
                className="text-gray-600 dark:text-gray-400"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}