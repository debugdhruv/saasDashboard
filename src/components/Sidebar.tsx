"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";

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

interface SidebarProps {
  isSidebarCollapsed: boolean;
}

const navSections: NavSection[] = [
  {
    title: "",
    items: [
      { name: "Overview", href: "/", isCustomDot: true, isClickable: false },
      { name: "Projects", href: "/", isCustomDot: true, isClickable: false },
    ],
  },
  {
    title: "Dashboards",
    items: [
      { name: "Default", icon: "/ChartPieSlice.svg", href: "/", isClickable: true },
      { name: "eCommerce", icon: "/ShoppingBagOpen.svg", href: "/", isClickable: true },
      { name: "Projects", icon: "/FolderNotch.svg", href: "/", isClickable: true },
      { name: "Online Courses", icon: "/BookOpen.svg", href: "/", isClickable: true },
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
      { name: "Blog", icon: "/Notebook.svg", href: "/", isClickable: true },
      { name: "Social", icon: "/ChatsTeardrop.svg", href: "/", isClickable: true },
    ],
  },
];

export default function Sidebar({ isSidebarCollapsed }: SidebarProps) {
  const [selected, setSelected] = useState<string>("Default");
  const [openMenus, setOpenMenus] = useState<string[]>(["User Profile"]);
  const [arrowStates, setArrowStates] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<"Favorites" | "Recently">("Favorites");
  const [isDarkMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(!isSidebarCollapsed);

  useEffect(() => {
    if (isSidebarCollapsed) {
      setShowContent(false);
    } else {
      const timer = setTimeout(() => setShowContent(true), 150);
      return () => clearTimeout(timer);
    }
  }, [isSidebarCollapsed]);

  const getIconPath = (iconPath: string) => {
    if (!iconPath) return iconPath;
    if (isDarkMode) {
      const fileName = iconPath.split('/').pop();
      return `/dark/${fileName}`;
    }
    return iconPath;
  };

  const toggleMenu = (name: string) => {
    if (isSidebarCollapsed) return; // Don't allow dropdown in collapsed state

    setIsAnimating(name);
    setOpenMenus((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );

    setTimeout(() => {
      setIsAnimating(null);
    }, 300);
  };

  const toggleArrow = (name: string) => {
    if (isSidebarCollapsed) return; // Don't allow arrow toggle in collapsed state

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

  const handleTabSwitch = (tab: "Favorites" | "Recently") => {
    if (isSidebarCollapsed) return; // Don't allow tab switch in collapsed state
    setActiveTab(tab);
  };

  return (
    <aside className={clsx(
      "fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ease-out",
      isSidebarCollapsed ? "w-16" : "w-64"
    )}>
      <Link href={"/"}>
      <div className={clsx(
        "flex cursor-pointer items-center pt-4 mb-6 transition-all duration-300 ease-out",
        isSidebarCollapsed ? "justify-center" : "gap-3 pl-4"
      )}>
        <Image
          src="/Logo.png"
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full transition-all duration-200"
        />
        <span
          className={clsx(
            "font-medium tracking-wider text-[14px] text-gray-900 dark:text-white transition-all duration-150 ease-out whitespace-nowrap overflow-hidden",
            showContent && !isSidebarCollapsed ? "opacity-100 w-auto" : "opacity-0 w-0 ml-0"
          )}
        >
          ByeWind
        </span>
      </div>
      </Link>

      <div className={clsx(
        "flex pl-4 mb-2 transition-all duration-150 ease-out overflow-hidden",
        showContent && !isSidebarCollapsed ? "opacity-100 h-auto" : "opacity-0 h-0"
      )}>
        <button
          onClick={() => handleTabSwitch("Favorites")}
          className={clsx(
            "text-sm font-medium mr-6 transition-all duration-300 ease-in-out",
            activeTab === "Favorites"
              ? "text-gray-600 dark:text-white"
              : "text-gray-300 dark:text-gray-500"
          )}
        >
          Favorites
        </button>
        <button
          onClick={() => handleTabSwitch("Recently")}
          className={clsx(
            "text-sm font-medium transition-all duration-300 ease-in-out",
            activeTab === "Recently"
              ? "text-gray-600 dark:text-white"
              : "text-gray-300 dark:text-gray-500"
          )}
        >
          Recently
        </button>
      </div>

      <nav className={clsx("space-y-6", isSidebarCollapsed ? "px-2" : "px-4")}>
        {navSections.map((section, idx) => {
          if (isSidebarCollapsed && idx === 0) {
            return null;
          }

          return (
            <div key={idx} className="animate-in slide-in-from-left-4 duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
              {section.title && (
                <h2 className={clsx(
                  "text-[14px] font-medium text-gray-400 dark:text-gray-500 mb-2 transition-all duration-150 ease-out whitespace-nowrap overflow-hidden",
                  showContent && !isSidebarCollapsed ? "opacity-100 h-auto" : "opacity-0 h-0"
                )}>
                  {section.title}
                </h2>
              )}
              <ul className="space-y-1">
                {section.items.map((item, itemIdx) => {
                  const isActive = selected === item.name;
                  const isOpen = openMenus.includes(item.name) && !isSidebarCollapsed;
                  const arrowDown = (arrowStates[item.name] || isOpen) && !isSidebarCollapsed;

                  return (
                    <li key={item.name} className="animate-in slide-in-from-left-2 duration-200" style={{ animationDelay: `${itemIdx * 50}ms` }}>
                      <div className="relative">
                        <button
                          onClick={() => {
                            if (item.children && !isSidebarCollapsed) {
                              toggleMenu(item.name);
                            } else if (item.isClickable) {
                              if (!item.isCustomDot && !isSidebarCollapsed) {
                                toggleArrow(item.name);
                              }
                              handleItemClick(item.name, item.isClickable);
                            }
                          }}
                          className={clsx(
                            "w-full h-8 flex items-center rounded-md transition-all duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800",
                            isSidebarCollapsed ? "gap-0 px-2 py-2 justify-center" : "gap-2 px-2 py-1",
                            "text-gray-700 dark:text-gray-300",
                            isActive && item.isClickable && "bg-gray-100 h-8 transition-transform duration-200 dark:bg-gray-800 font-medium text-black dark:text-white"
                          )}
                          title={isSidebarCollapsed ? item.name : undefined} // Show tooltip when collapsed
                        >
                          {(!item.isCustomDot || item.children) && (
                            <Image
                              src={getIconPath(arrowDown ? "/ArrowLineDown.svg" : "/ArrowLineRight.svg")}
                              alt={arrowDown ? "expanded" : "collapsed"}
                              width={16}
                              height={16}
                              className={clsx(
                                "text-gray-500 dark:text-gray-400 transition-all duration-300 ease-out",
                                showContent && !isSidebarCollapsed ? "opacity-100 w-4" : "opacity-0 w-0"
                              )}
                            />
                          )}

                          {item.isCustomDot ? (
                            <span
                              className={clsx(
                                "w-2 h-2 rounded-full transition-all duration-300 ease-in-out",
                                isActive ? 'bg-green-500' : 'bg-gray-400 dark:bg-gray-500'
                              )}
                            />
                          ) : item.icon ? (
                            <Image
                              src={getIconPath(item.icon)}
                              alt={item.name}
                              width={18}
                              height={18}
                              className="transition-all duration-200 ease-out flex-shrink-0"
                            />
                          ) : null}

                          <span className={clsx(
                            "text-sm font-medium transition-all duration-150 ease-out whitespace-nowrap overflow-hidden",
                            showContent && !isSidebarCollapsed ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 ml-0"
                          )}>
                            {item.name}
                          </span>
                        </button>

                        {isActive && item.isClickable && (
                          <Image
                            src={getIconPath("/Selected.svg")}
                            alt="selected"
                            width={18}
                            height={18}
                            className="absolute -left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out"
                          />
                        )}
                      </div>

                      {item.children && !isSidebarCollapsed && (
                        <div
                          className={clsx(
                            "ml-13 overflow-hidden transition-all duration-500 ease-in-out",
                            isOpen
                              ? "max-h-96 opacity-100 mt-1"
                              : "max-h-0 opacity-0 mt-0"
                          )}
                        >
                          <ul className={clsx(
                            "space-y-1 transform transition-all duration-300 ease-in-out",
                            isOpen ? "translate-y-0 scale-100" : "-translate-y-2 scale-95"
                          )}>
                            {item.children.map((child, childIdx) => {
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
                                      "block px-4 py-1 text-sm text-gray-600 dark:text-gray-400 rounded-md",
                                      "transition-all duration-200 ease-in-out",
                                      "hover:bg-gray-100 dark:hover:bg-gray-800",
                                      childActive && "bg-gray-100 dark:bg-gray-800 font-medium text-black dark:text-white"
                                    )}
                                    style={{
                                      animationDelay: `${childIdx * 50}ms`,
                                      opacity: isOpen ? 1 : 0,
                                      transform: isOpen ? 'translateX(0)' : 'translateX(-10px)'
                                    }}
                                  >
                                    <span className="transition-transform duration-200">
                                      {child.name}
                                    </span>
                                  </a>

                                  {childActive && (
                                    <Image
                                      src={getIconPath("/Selected.svg")}
                                      alt="selected"
                                      width={18}
                                      height={18}
                                      className="absolute -left-0 top-1/2 -translate-y-1/2 transition-all duration-200 ease-in-out"
                                    />
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}