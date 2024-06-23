import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgArrowBottomLeft } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FaSourcetree } from "react-icons/fa";
import { HiBellAlert } from "react-icons/hi2";
import { FaHandsHelping } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleItemClick = (route) => {
    navigate(route);
    toggleSidebar();
  };

  return (
    <div className={`fixed top-0 left-0 w-64 h-full bg-lime-800 text-white transform ${isOpen? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
  <div className="flex flex-col h-full justify-between">
    <div className="flex-1 flex flex-col justify-center items-center">
      <ul className="space-y-4 text-center text-lg">
        <li className="px-6 py-2 hover:bg-lime-700 cursor-pointer flex justify-center" onClick={() => handleItemClick('/')}>
           Home<FaHome className="ml-2 mt-1" />
        </li>
        <li className="px-6 py-2 hover:bg-lime-700 cursor-pointer flex justify-center" onClick={() => handleItemClick('/perfil')}>
          Perfil<FaUser className="ml-2 mt-1"  />
        </li>
        <li className="px-6 py-2 hover:bg-lime-700 cursor-pointer flex justify-center" onClick={() => handleItemClick('/usuarios')}>
          Usuarios<FaUsers className="ml-2 mt-1"  />
        </li>
        <li className="px-6 py-2 hover:bg-lime-700 cursor-pointer flex justify-center" onClick={() => handleItemClick('/areas')}>
          Areas<FaSourcetree className="ml-2 mt-1"  />
        </li>
        <li className="px-6 py-2 hover:bg-lime-700 cursor-pointer flex justify-center" onClick={() => handleItemClick('/novedades')}>
          Novedades<HiBellAlert className="ml-2 mt-1"  />
        </li>
        <li className="px-6 py-2 hover:bg-lime-700 cursor-pointer flex justify-center" onClick={() => handleItemClick('/prestamos')}>
          Prestamos<FaHandsHelping className="ml-2 mt-1"  />
        </li>
      </ul>
    </div>
    <div className="mb-4 text-center">
      <button 
        className="flex items-center justify-center mx-auto p-2 bg-lime-900 hover:bg-lime-700 rounded" 
        onClick={toggleSidebar}
      >
        <CgArrowBottomLeft className="text-2xl" />
      </button>  
    </div>
  </div>
</div>
  );
};

export default Sidebar;








