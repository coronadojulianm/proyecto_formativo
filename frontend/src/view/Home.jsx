import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import HButton from '../components/HButton';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <HButton toggleSidebar={toggleSidebar} />
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-4">
          <h1 className="text-3xl font-bold">Home</h1>
          <p className='text-cyan-300'>Bienvenido a la página de inicio</p>
        </div>
      </div>
    </>
  );
}
