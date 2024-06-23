import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Table from '../components/tables/Tablenovedades.jsx';
import {Button} from "@nextui-org/react";
import { AiFillAlert } from "react-icons/ai";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-4 mt-16 flex justify-center"> {/* mt-16 para compensar la altura del Navbar */}
          <div>
            <h1 className="text-3xl font-bold text-blue-500">Novedades</h1>
            <br />
            <Button color="success" className='mb-3' endContent={<AiFillAlert />}>
              Registrar
            </Button>
            <div className="flex justify-center">
              <Table />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}