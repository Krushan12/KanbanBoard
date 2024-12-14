import React, { useState } from 'react';
import LogoIcon from '../assets/icons/Kanban_Board.png';
import { 
  FilterIcon, 
  PlusIcon, 
  SettingsIcon, 
  UserIcon, 
  ChevronRightIcon,
  ChevronLeftIcon 
} from 'lucide-react';
import InitialLogo from './InitialLogo';

export default function SideBar({ 
  onAddProject, 
  onFilterTasks, 
  onSettings, 
  isExpanded, 
  toggleSidebar 
}) {
  const sidebarItems = [
    { 
      icon: <PlusIcon className="w-5 h-5" />, 
      label: 'Add Project',
      action: onAddProject 
    },
    { 
      icon: <FilterIcon className="w-5 h-5" />, 
      label: 'Filter Tasks', 
      action: onFilterTasks 
    },
    { 
      icon: <UserIcon className="w-5 h-5" />, 
      label: 'Profile', 
      action: () => {} 
    },
    { 
      icon: <SettingsIcon className="w-5 h-5" />, 
      label: 'Settings', 
      action: onSettings 
    }
  ];

  return (
    <div 
      className={`
        bg-gray-900 
        text-white 
        h-screen 
        fixed 
        left-0 
        top-0 
        transition-all 
        duration-300 
        z-50
        ${isExpanded ? 'w-64' : 'w-16'}
        shadow-lg
        flex 
        flex-col
      `}
    >
      {/* Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="
          absolute 
          top-4 
          -right-4 
          bg-gray-900 
          text-white 
          p-2 
          rounded-full 
          shadow-md 
          hover:bg-gray-700 
          transition-colors
        "
      >
        {isExpanded ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />}
      </button>

      {/* Logo/Title Area */}
      <div className="p-4 border-b border-gray-700 flex items-center">
        <img 
          src={LogoIcon} 
          alt="Logo" 
          className="w-8 h-8 rounded-full mr-3" 
        />
        {isExpanded && (
          <h2 className="text-xl font-bold">Kanban</h2>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-grow mt-4">
        {sidebarItems.map((item, index) => (
          <button 
            key={index}
            onClick={item.action}
            className="
              w-full 
              flex 
              items-center 
              p-3 
              hover:bg-gray-800 
              transition-colors
              focus:outline-none
            "
          >
            <div className="mx-4">{item.icon}</div>
            {isExpanded && (
              <span className="ml-2">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* User/Account Section */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <InitialLogo 
            name="Kiteretsu"  
            size={32}          
            className="border"  
          />
          {isExpanded && (
            <div className="ml-2">
              <p className="font-semibold">Kiteretsu</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
