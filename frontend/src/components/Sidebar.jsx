import React from 'react';
import { Link } from 'react-router-dom';
import { CgArrowBottomLeft } from "react-icons/cg";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`fixed top-0 left-0 w-64 h-full bg-green-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="flex flex-col h-full justify-between">
        <div className="mt-16">
          <ul className="space-y-4 text-center">
            <li className="px-6 py-2 hover:bg-green-700 cursor-pointer" onClick={toggleSidebar}>
              <Link to="/">Home</Link>
            </li>
            <li className="px-6 py-2 hover:bg-green-700 cursor-pointer" onClick={toggleSidebar}>
              <Link to="/perfil">Perfil</Link>
            </li>
            <li className="px-6 py-2 hover:bg-green-700 cursor-pointer" onClick={toggleSidebar}>
              <Link to="/usuarios">Usuarios</Link>
            </li>
            <li className="px-6 py-2 hover:bg-green-700 cursor-pointer" onClick={toggleSidebar}>
              <Link to="/areas">Areas</Link>
            </li>
            <li className="px-6 py-2 hover:bg-green-700 cursor-pointer" onClick={toggleSidebar}>
              <Link to="/ambientes">Ambientes</Link>
            </li>
            <li className="px-6 py-2 hover:bg-green-700 cursor-pointer" onClick={toggleSidebar}>
              <Link to="/novedades">Novedades</Link>
            </li>
            <li className="px-6 py-2 hover:bg-green-700 cursor-pointer" onClick={toggleSidebar}>
              <Link to="/prestamos">Prestamos</Link>
            </li>
          </ul>
        </div>
        <div className="mb-4 text-center">
          <button 
            className="flex items-center justify-center mx-auto p-2 bg-green-700 hover:bg-green-600 rounded" 
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








