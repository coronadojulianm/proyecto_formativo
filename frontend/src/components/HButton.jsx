import React from 'react';

const HButton = ({ toggleSidebar }) => {
  return (
    <div className="flex flex-col justify-between w-8 h-6 cursor-pointer" onClick={toggleSidebar}>
      <div className="w-full h-1 bg-gray-800"></div>
      <div className="w-full h-1 bg-gray-800"></div>
      <div className="w-full h-1 bg-gray-800"></div>
    </div>
  );
};

export default HButton;
