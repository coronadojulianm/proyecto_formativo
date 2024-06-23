import React from 'react';
import { FaBars } from 'react-icons/fa';

const HButton = ({ isOpen, toggleSidebar }) => {
  return (
    <button onClick={toggleSidebar} className="text-white p-2 focus:outline-none">
      <FaBars className="text-xl" />
    </button>
  );
};

export default HButton;


