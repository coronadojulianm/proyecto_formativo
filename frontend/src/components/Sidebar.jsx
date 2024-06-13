import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <ul className="mt-16 space-y-4">
        <li className="px-6 py-2 hover:bg-gray-700 cursor-pointer" onClick={toggleSidebar}>
          <Link to="/">Home</Link>
        </li>
        <li className="px-6 py-2 hover:bg-gray-700 cursor-pointer" onClick={toggleSidebar}>
          <Link to="/perfil">Perfil</Link>
        </li>
        <li className="px-6 py-2 hover:bg-gray-700 cursor-pointer" onClick={toggleSidebar}>
          <Link to="/usuarios">Usuarios</Link>
        </li>
        <li className="px-6 py-2 hover:bg-gray-700 cursor-pointer" onClick={toggleSidebar}>
          <Link to="/areas">Areas</Link>
        </li>
        <li className="px-6 py-2 hover:bg-gray-700 cursor-pointer" onClick={toggleSidebar}>
          <Link to="/ambientes">Ambientes</Link>
        </li>
        <li className="px-6 py-2 hover:bg-gray-700 cursor-pointer" onClick={toggleSidebar}>
          <Link to="/novedades">Novedades</Link>
        </li>
        <li className="px-6 py-2 hover:bg-gray-700 cursor-pointer" onClick={toggleSidebar}>
          <Link to="/prestamos">Prestamos</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

