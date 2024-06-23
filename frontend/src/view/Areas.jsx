import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Table from '../components/tables/Tableareas';
import TableA from '../components/tables/Tableambientes';
import { Button } from "@nextui-org/react";
import { PiMapPinAreaFill } from "react-icons/pi";
import { BsHousesFill } from "react-icons/bs";

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
        <div className="p-4 mt-16 flex justify-center space-x-4"> {/* mt-16 para compensar la altura del Navbar */}
          <div className="w-full max-w-2xl">
            <h1 className="ml-9 text-3xl font-bold text-blue-500 text-left ">Areas</h1>
            <br />
            <Button color="success" className='mb-3 ml-9' endContent={<PiMapPinAreaFill />}>
              Registrar
            </Button>
            <div className="flex justify-center">
              <Table />
            </div>
          </div>
          <div className="w-full max-w-2xl">
            <h1 className="ml-9 text-3xl font-bold text-blue-500 text-left">Ambientes</h1>
            <br />
            <Button color="success" className='mb-3 ml-9' endContent={<BsHousesFill />}>
              Registrar
            </Button>
            <div className="flex justify-center">
              <TableA />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


