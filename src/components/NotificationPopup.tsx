"use client";
import Image from "next/image";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface NotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onViewAll: () => void;
}

export default function NotificationPopup({ isOpen, onClose, onViewAll }: NotificationPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  const notifications = [
    {
      id: 1,
      type: 'bug',
      icon: '/rightsidebar/BugBeetle.svg',
      message: 'You have a bug that needs...',
      time: 'Just now',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 2,
      type: 'user',
      icon: '/rightsidebar/User.svg',
      message: 'New user registered',
      time: '59 minutes ago',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      id: 3,
      type: 'bug',
      icon: '/rightsidebar/BugBeetle.svg',
      message: 'You have a bug that needs...',
      time: '12 hours ago',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 4,
      type: 'subscription',
      icon: '/rightsidebar/Broadcast.svg',
      message: 'Andi Lane subscribed to you',
      time: 'Today, 11:59 AM',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);
      }, 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      // Delay unmounting to allow exit animation
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <>
      <div 
        className={clsx(
          "fixed inset-0 z-40 transition-all duration-300 ease-out",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      <div 
        ref={popupRef}
        className={clsx(
          "fixed top-20 right-6 w-80 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg z-50",
          "transform transition-all duration-300 ease-out",
          isOpen 
            ? "opacity-100 scale-100 translate-x-0" 
            : "opacity-0 scale-95 translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Notifications
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
          >
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          <div className="p-4 space-y-3">
            {notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={clsx(
                  "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 ease-in-out cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isOpen ? 'slideInUp 0.3s ease-out forwards' : 'none'
                }}
                onClick={() => {
                  console.log('Notification clicked:', notification.id);
                }}
              >
                <div className={clsx(
                  "w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0 transition-transform duration-200 hover:scale-110",
                  notification.bgColor
                )}>
                  <Image 
                    src={notification.icon} 
                    alt={notification.type} 
                    width={20} 
                    height={20} 
                    className={clsx(notification.iconColor, "transition-transform duration-200")}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {notification.time}
                  </p>
                </div>
                {['Just now', '59 minutes ago'].includes(notification.time) && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            onClick={() => {
              onViewAll();
              onClose();
            }}
            className="w-full p-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition-all duration-200 rounded-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            View all notifications
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes slideOutToRight {
          from {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateX(100%) scale(0.95);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}