"use client";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

type NavItem = {
  name: string;
  icon?: string;
  href: string;
  isCustomDot?: boolean;
  isClickable?: boolean;
  children?: { name: string; href: string }[];
};

type NavSection = {
  title?: string;
  items: NavItem[];
};

const navSections: NavSection[] = [
  {
    title: "",
    items: [
      { name: "Overview", href: "/", isCustomDot: true, isClickable: true },
      { name: "Projects", href: "/", isCustomDot: true, isClickable: true },
    ],
  },
  {
    title: "Dashboards",
    items: [
      { name: "Default", icon: "/ChartPieSlice.svg", href: "/", isClickable: true },
      { name: "eCommerce", icon: "/ShoppingBagOpen.svg", href: "/", isClickable: true },
      { name: "Projects", icon: "/FolderNotch.svg", href: "/", isClickable: true },
      { name: "Online Courses", icon: "/Notebook.svg", href: "/", isClickable: true },
    ],
  },
  {
    title: "Pages",
    items: [
      {
        name: "User Profile",
        icon: "/IdentificationCard.svg",
        href: "/",
        isClickable: true,
        children: [
          { name: "Overview", href: "/" },
          { name: "Projects", href: "/" },
          { name: "Campaigns", href: "/" },
          { name: "Documents", href: "/" },
          { name: "Followers", href: "/" },
        ],
      },
      { name: "Account", icon: "/IdentificationBadge.svg", href: "/", isClickable: true },
      { name: "Corporate", icon: "/UsersThree.svg", href: "/", isClickable: true },
      { name: "Blog", icon: "/BookOpen.svg", href: "/", isClickable: true },
      { name: "Social", icon: "/ChatsTeardrop.svg", href: "/", isClickable: true },
    ],
  },
];

export default function Sidebar() {
  const [selected, setSelected] = useState<string>("Default");
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [arrowStates, setArrowStates] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<"Favorites" | "Recently">("Favorites");

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const toggleArrow = (name: string) => {
    setArrowStates((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleItemClick = (itemName: string, isClickable: boolean = true) => {
    if (isClickable) {
      setSelected(itemName);
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      {/* Top Profile */}
      <div className="flex items-center gap-3 p-4">
        <Image
          src="/Logo.png"
          alt="Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="font-medium text-gray-900 dark:text-white">ByeWind</span>
      </div>

      {/* Tabs: Favorites and Recently */}
      <div className="flex px-4 pb-4">
        <button
          onClick={() => setActiveTab("Favorites")}
          className={clsx(
            "text-sm font-medium mr-8",
            activeTab === "Favorites"
              ? "text-gray-900 dark:text-white font-semibold"
              : "text-gray-400 dark:text-gray-500"
          )}
        >
          Favorites
        </button>
        <button
          onClick={() => setActiveTab("Recently")}
          className={clsx(
            "text-sm font-medium",
            activeTab === "Recently"
              ? "text-gray-900 dark:text-white font-semibold"
              : "text-gray-400 dark:text-gray-500"
          )}
        >
          Recently
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-4 space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx}>
            {section.title && (
              <h3 className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                {section.title}
              </h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = selected === item.name;
                const isOpen = openMenus.includes(item.name);
                const arrowDown = arrowStates[item.name] || isOpen;
                
                return (
                  <li key={item.name}>
                    <div className="relative">
                      <button
                        onClick={() => {
                          // Only User Profile has actual dropdown functionality
                          if (item.children) {
                            toggleMenu(item.name);
                          } else {
                            // Other items just toggle arrow and selection
                            if (!item.isCustomDot) {
                              toggleArrow(item.name);
                            }
                            handleItemClick(item.name, item.isClickable);
                          }
                        }}
                        className={clsx(
                          "w-full flex items-center gap-2 px-2 py-2 text-gray-700 dark:text-gray-300 rounded-md",
                          item.isClickable && "hover:bg-gray-100 dark:hover:bg-gray-800",
                          isActive && item.isClickable && "bg-gray-100 dark:bg-gray-800 font-medium text-black dark:text-white"
                        )}
                      >
                        {/* Only show arrows for non-dot items or items with children */}
                        {(!item.isCustomDot || item.children) && (
                          <Image
                            src={arrowDown ? "/ArrowLineDown.svg" : "/ArrowLineRight.svg"}
                            alt={arrowDown ? "expanded" : "collapsed"}
                            width={16}
                            height={16}
                            className="text-gray-500 dark:text-gray-400"
                          />
                        )}
                        {item.isCustomDot ? (
                          <span 
                            className={clsx(
                              "w-2 h-2 rounded-full",
                              isActive ? 'bg-green-500' : 'bg-gray-400 dark:bg-gray-500'
                            )}
                          />
                        ) : item.icon ? (
                          <Image
                            src={item.icon}
                            alt={item.name}
                            width={18}
                            height={18}
                          />
                        ) : null}
                        <span className="text-sm font-medium">{item.name}</span>
                      </button>
                      {isActive && item.isClickable && (
                        <Image
                          src="/Selected.svg"
                          alt="selected"
                          width={16}
                          height={16}
                          className="absolute -left-5 top-1/2 -translate-y-1/2"
                        />
                      )}
                    </div>
                    
                    {/* Only show dropdown for User Profile */}
                    {item.children && isOpen && (
                      <ul className="ml-8 mt-1 space-y-1">
                        {item.children.map((child) => {
                          const childActive = selected === child.name;
                          return (
                            <li key={child.name} className="relative">
                              <a
                                href={child.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleItemClick(child.name);
                                }}
                                className={clsx(
                                  "block px-2 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md",
                                  childActive && "bg-gray-100 dark:bg-gray-800 font-medium text-black dark:text-white"
                                )}
                              >
                                {child.name}
                              </a>
                              {childActive && (
                                <Image
                                  src="/Selected.svg"
                                  alt="selected"
                                  width={16}
                                  height={16}
                                  className="absolute -left-5 top-1/2 -translate-y-1/2"
                                />
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}