import React from 'react';

export default function InitialLogo({ 
  name = 'John Doe', 
  size = 40, 
  className = '' 
}) {
  // Extract initials
  const getInitials = (fullName) => {
    return fullName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate a consistent color based on the name
  const generateColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  const initials = getInitials(name);
  const bgColor = generateColor(name);

  return (
    <div 
      className={`
        rounded-full 
        flex 
        items-center 
        justify-center 
        text-white 
        font-bold 
        ${className}
      `}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: bgColor,
        fontSize: `${size / 2}px`
      }}
    >
      {initials}
    </div>
  );
}