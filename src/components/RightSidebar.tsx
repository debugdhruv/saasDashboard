"use client";
import Image from "next/image";
import clsx from "clsx";

interface RightSidebarProps {
    isRightSidebarOpen: boolean;
}

export default function RightSidebar({ isRightSidebarOpen }: RightSidebarProps) {
    const notifications = [
        {
            id: 1,
            type: 'bug',
            icon: '/rightsidebar/BugBeetle.svg',
            message: 'You have a bug that needs...',
            time: 'Just now',
            bgColor: 'bg-blue-100 dark:bg-blue-900',
            iconColor: 'text-blue-600 dark:text-blue-400'
        },
        {
            id: 2,
            type: 'user',
            icon: '/rightsidebar/User.svg',
            message: 'New user registered',
            time: '59 minutes ago',
            bgColor: 'bg-green-100 dark:bg-green-900',
            iconColor: 'text-green-600 dark:text-green-400'
        },
        {
            id: 3,
            type: 'bug',
            icon: '/rightsidebar/BugBeetle.svg',
            message: 'You have a bug that needs...',
            time: '12 hours ago',
            bgColor: 'bg-blue-100 dark:bg-blue-900',
            iconColor: 'text-blue-600 dark:text-blue-400'
        },
        {
            id: 4,
            type: 'subscription',
            icon: '/rightsidebar/Broadcast.svg',
            message: 'Andi Lane subscribed to you',
            time: 'Today, 11:59 AM',
            bgColor: 'bg-purple-100 dark:bg-purple-900',
            iconColor: 'text-purple-600 dark:text-purple-400'
        }
    ];

    const activities = [
        {
            id: 1,
            avatar: '/avatars/avatar1.png',
            message: 'You have a bug that needs...',
            time: 'Just now',
            bgColor: 'bg-red-500'
        },
        {
            id: 2,
            avatar: '/avatars/avatar2.png',
            message: 'Released a new version',
            time: '59 minutes ago',
            bgColor: 'bg-green-500'
        },
        {
            id: 3,
            avatar: '/avatars/avatar3.png',
            message: 'Submitted a bug',
            time: '12 hours ago',
            bgColor: 'bg-blue-500'
        },
        {
            id: 4,
            avatar: '/avatars/avatar4.png',
            message: 'Modified A data in Page X',
            time: 'Today, 11:59 AM',
            bgColor: 'bg-orange-500'
        },
        {
            id: 5,
            avatar: '/avatars/avatar5.png',
            message: 'Deleted a page in Project X',
            time: 'Feb 2, 2023',
            bgColor: 'bg-gray-500'
        }
    ];

    const contacts = [
        { name: 'Natali Craig', avatar: '/avatars/avatar6.png', bgColor: 'bg-pink-500' },
        { name: 'Drew Cano', avatar: '/avatars/avatar7.png', bgColor: 'bg-red-500' },
        { name: 'Orlando Diggs', avatar: '/avatars/avatar8.png', bgColor: 'bg-yellow-500' },
        { name: 'Andi Lane', avatar: '/avatars/avatar9.png', bgColor: 'bg-gray-500' },
        { name: 'Kate Morrison', avatar: '/avatars/avatar10.png', bgColor: 'bg-purple-500' },
        { name: 'Koray Okumus', avatar: '/avatars/avatar11.png', bgColor: 'bg-blue-500' }
    ];

    return (
        <aside
            className={clsx(
                "fixed top-0 right-0 h-screen bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 transition-all duration-300 ease-out overflow-y-auto z-30",
                isRightSidebarOpen ? "w-80" : "w-0 border-l-0"
            )}>
            <div className={clsx(
                "transition-all duration-300 ease-out",
                isRightSidebarOpen ? "opacity-100 pt-5 pl-5" : "opacity-0 p-0"
            )}>
                <div className="mb-8 mr-4">
                    <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                        Notifications
                    </h3>
                    <div className="space-y-3">
                        {notifications.map(notification => (
                            <div
                                key={notification.id}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 ease-in-out cursor-pointer">
                                <div className="w-10 h-10 flex items-center bg-blue-50 rounded-lg justify-center flex-shrink-0">
                                    <Image src={notification.icon} alt={notification.type} width={20} height={20} className="text-gray-600 dark:text-gray-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900 dark:text-white leading-relaxed">
                                        {notification.message}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {notification.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-8 mr-4">
                    <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                        Activities
                    </h4>
                    <div className="space-y-3">
                        {activities.map(activity => (
                            <div
                                key={activity.id}
                                className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 ease-in-out cursor-pointer"
                            >
                                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                    <Image
                                        src={activity.avatar}
                                        alt="User avatar"
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900 dark:text-white leading-relaxed">
                                        {activity.message}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-8 mr-4">
                    <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                        Contacts
                    </h4>
                    <div className="space-y-0">
                        {contacts.map((contact, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 ease-in-out cursor-pointer"
                            >
                                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                    <Image
                                        src={contact.avatar}
                                        alt={contact.name}
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="text-sm text-gray-900 dark:text-white">
                                    {contact.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}