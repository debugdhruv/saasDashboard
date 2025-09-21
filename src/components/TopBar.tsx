// "use client";
// import Image from "next/image";
// import { useState } from "react";
// import clsx from "clsx";
// import NotificationPopup from "./NotificationPopup";

// interface TopBarProps {
//   isSidebarCollapsed: boolean;
//   onToggleSidebar: () => void;
//   isDarkMode: boolean;
//   onToggleDarkMode: () => void;
//   isRightSidebarOpen: boolean;
//   onToggleRightSidebar: () => void;
// }

// export default function TopBar({
//   isSidebarCollapsed,
//   onToggleSidebar,
//   isDarkMode,
//   onToggleDarkMode,
//   isRightSidebarOpen,
//   onToggleRightSidebar
// }: TopBarProps) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showNotificationPopup, setShowNotificationPopup] = useState(false);
//   const [activeBreadcrumb, setActiveBreadcrumb] = useState("Default");

//   return (
//     <header
//       className={clsx(
//         "fixed top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ease-out z-40 h-16",
//         isSidebarCollapsed ? "left-16" : "left-64",
//         isRightSidebarOpen ? "right-80" : "right-0"
//       )}>
//       <div className="flex items-center justify-between h-full px-6">
//         {/* Left side - Menu toggle and breadcrumbs */}
//         <div className="flex items-center gap-4">
//           {/* Menu Toggle Button */}
//           <button
//             onClick={onToggleSidebar}
//             className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
//             <Image
//               src="/topbar/Sidebar.svg"
//               alt="Menu"
//               width={20}
//               height={20}
//               className="text-gray-600 dark:text-gray-400"
//             />
//           </button>

//           {/* Star Icon */}
//           <button className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
//             <Image
//               src="/topbar/Star.svg"
//               alt="Star"
//               width={20}
//               height={20}
//               className="text-gray-600 dark:text-gray-400"
//             />
//           </button>

//           {/* Breadcrumbs */}
//           <nav className="flex items-center gap-2 text-sm">
//             <span
//               onClick={() => setActiveBreadcrumb("Dashboards")}
//               className={clsx(
//                 "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-3 py-2 transition-all duration-200",
//                 activeBreadcrumb === "Dashboards"
//                   ? "text-gray-900 dark:text-white font-medium"
//                   : "text-gray-500 dark:text-gray-400"
//               )}>
//               Dashboards
//             </span>
//             <span className="text-gray-400 dark:text-gray-500">/</span>
//             <span
//               onClick={() => setActiveBreadcrumb("Default")}
//               className={clsx(
//                 "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-3 py-2 transition-all duration-200",
//                 activeBreadcrumb === "Default"
//                   ? "text-gray-900 dark:text-white font-medium"
//                   : "text-gray-500 dark:text-gray-400"
//               )}>
//               Default
//             </span>
//           </nav>
//         </div>
//         {/* Right side - Search and actions */}
//         <div className="flex items-center gap-3">
//           {/* Search */}
//           <div className="relative">
//             <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//               <Image
//                 src="/topbar/search.svg"
//                 alt="Search"
//                 width={16}
//                 height={16}
//                 className="text-gray-400 opacity-40 dark:text-gray-500"
//               />
//             </div>
//             <input
//               type="text"
//               placeholder="Search"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className={clsx(
//                 "pl-8 pr-12 py-2 w-54 items-center hover:bg-gray-100 rounded-lg border transition-all duration-200 focus:ring-0 focus:border-0",
//                 "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700",
//                 "text-gray-900 dark:text-white placeholder-gray-500 text-xs dark:placeholder-gray-400"
//               )}
//             />
//             <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//               <span className="text-xs text-gray-400 dark:text-gray-500 px-1.5 py-0.5 rounded">
//                 ⌘/
//               </span>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex items-center gap-2">
//             {/* Theme Toggle */}
//             <button
//               onClick={onToggleDarkMode}
//               className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
//             >
//               <Image
//                 src="/topbar/Sun.svg"
//                 alt={isDarkMode ? "Light Mode" : "Dark Mode"}
//                 width={20}
//                 height={20}
//                 className="text-gray-600 dark:text-gray-400"
//               />
//             </button>

//             {/* History */}
//             <button className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
//               <Image
//                 src="/topbar/ClockCounterClockwise.svg"
//                 alt="History"
//                 width={20}
//                 height={20}
//                 className="text-gray-600 dark:text-gray-400"
//               />
//             </button>

//             {/* Notifications */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowNotificationPopup(!showNotificationPopup)}
//                 className={clsx(
//                   "p-2 rounded-lg transition-all duration-200 relative",
//                   showNotificationPopup
//                     ? "bg-gray-200 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
//                     : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
//                 )}
//               >
//                 <Image
//                   src="/topbar/Bell.svg"
//                   alt="Notifications"
//                   width={20}
//                   height={20}
//                   className={clsx(
//                     "transition-colors duration-200",
//                     showNotificationPopup ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
//                   )}
//                 />
//                 {/* Red notification dot */}
//                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
//               </button>
//             </div>

//             {/* Sidebar Toggle (right sidebar icon) */}
//             <button
//               onClick={onToggleRightSidebar}
//               className={clsx(
//                 "p-2 rotate-180 rounded-lg transition-all duration-200",
//                 isRightSidebarOpen
//                   ? "text-blue-600 dark:text-blue-400"
//                   : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
//               )}
//             >
//               <Image
//                 src="/topbar/Sidebar.svg"
//                 alt="Sidebar"
//                 width={20}
//                 height={20}
//                 className={clsx(
//                   "transition-colors duration-200",
//                   isRightSidebarOpen ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
//                 )}
//               />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Notification Popup */}
//       <NotificationPopup
//         isOpen={showNotificationPopup}
//         onClose={() => setShowNotificationPopup(false)}
//         onViewAll={() => {
//           setShowNotificationPopup(false);
//           onToggleRightSidebar();
//         }}
//       />
//     </header >
//   );
// }



"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import NotificationPopup from "./NotificationPopup";

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
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [activeBreadcrumb, setActiveBreadcrumb] = useState("Default");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      // Check for Cmd+/ (Mac) or Ctrl+/ (Windows/Linux)
      const isSearchShortcut = (event.metaKey || event.ctrlKey) && event.key === '/';
      
      if (isSearchShortcut) {
        event.preventDefault(); // Prevent default browser behavior
        searchInputRef.current?.focus(); // Focus the search input
        searchInputRef.current?.select(); // Optional: select all text
      }

      // Optional: Clear search and blur on Escape when search is focused
      if (event.key === 'Escape' && document.activeElement === searchInputRef.current) {
        setSearchQuery('');
        searchInputRef.current?.blur();
      }
    };

    // Add event listener to document
    document.addEventListener('keydown', handleGlobalKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  // Function to get the correct shortcut text based on platform
  const getShortcutText = () => {
    if (typeof navigator !== 'undefined') {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      return isMac ? '⌘/' : 'Ctrl/';
    }
    return '⌘/'; // Default to Mac style
  };

  return (
    <header
      className={clsx(
        "fixed top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ease-out z-40 h-16",
        isSidebarCollapsed ? "left-16" : "left-64",
        isRightSidebarOpen ? "right-80" : "right-0"
      )}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - Menu toggle and breadcrumbs */}
        <div className="flex items-center gap-4">
          {/* Menu Toggle Button */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
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
            <span
              onClick={() => setActiveBreadcrumb("Dashboards")}
              className={clsx(
                "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-3 py-2 transition-all duration-200",
                activeBreadcrumb === "Dashboards"
                  ? "text-gray-900 dark:text-white font-medium"
                  : "text-gray-500 dark:text-gray-400"
              )}>
              Dashboards
            </span>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <span
              onClick={() => setActiveBreadcrumb("Default")}
              className={clsx(
                "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-3 py-2 transition-all duration-200",
                activeBreadcrumb === "Default"
                  ? "text-gray-900 dark:text-white font-medium"
                  : "text-gray-500 dark:text-gray-400"
              )}>
              Default
            </span>
          </nav>
        </div>

        {/* Right side - Search and actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Image
                src="/topbar/search.svg"
                alt="Search"
                width={18}
                height={18}
                className="text-gray-400 opacity-40 dark:text-gray-500"
              />
            </div>
            <input
              ref={searchInputRef} // Added ref for keyboard shortcut
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={clsx(
                "pl-8 pr-12 py-2 h-9 w-54 items-center hover:bg-gray-100 rounded-lg border transition-all duration-200",
                "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700",
                "text-gray-900 dark:text-white placeholder-gray-500 text-sm dark:placeholder-gray-400"
              )}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-sm text-gray-600 dark:text-gray-500 px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 font-mono">
                {getShortcutText()}
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
                onClick={() => setShowNotificationPopup(!showNotificationPopup)}
                className={clsx(
                  "p-2 rounded-lg transition-all duration-200 relative",
                  showNotificationPopup
                    ? "bg-gray-200 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                )}
              >
                <Image
                  src="/topbar/Bell.svg"
                  alt="Notifications"
                  width={20}
                  height={20}
                  className={clsx(
                    "transition-colors duration-200",
                    showNotificationPopup ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
                  )}
                />
                {/* Red notification dot */}
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
            </div>

            {/* Sidebar Toggle (right sidebar icon) */}
            <button
              onClick={onToggleRightSidebar}
              className={clsx(
                "p-2 rotate-180 rounded-lg transition-all duration-200",
                isRightSidebarOpen
                  ? "text-blue-600 dark:text-blue-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
              )}
            >
              <Image
                src="/topbar/Sidebar.svg"
                alt="Sidebar"
                width={20}
                height={20}
                className={clsx(
                  "transition-colors duration-200",
                  isRightSidebarOpen ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Notification Popup */}
      <NotificationPopup
        isOpen={showNotificationPopup}
        onClose={() => setShowNotificationPopup(false)}
        onViewAll={() => {
          setShowNotificationPopup(false);
          onToggleRightSidebar();
        }}
      />
    </header >
  );
}