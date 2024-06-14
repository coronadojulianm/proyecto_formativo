import React from 'react';
import HButton from './HButton';

const Navbar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-green-800 text-white flex justify-between items-center p-4">
      <div className="flex items-center">
        <HButton isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className="text-center">
        <h1 className="text-xl font-bold">INAM</h1>
      </div>
      <div className="flex items-center">
        <span>usuario</span>
      </div>
    </div>
  );
};

export default Navbar;
