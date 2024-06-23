import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from '@nextui-org/react';
import { MdBrowserUpdated } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 2;

  useEffect(() => {
    axios.get('http://localhost:3000/area/listar')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (users.length === 0) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se carga la data
  }

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = users.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="flex flex-col items-center">
      <Table 
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px] w-max min-w-[600px]",
        }}
      >
        <TableHeader>
          <TableColumn key="id_area">ID Area</TableColumn>
          <TableColumn key="nombre_area">Nombre Area</TableColumn>
          <TableColumn key="estado">Estado</TableColumn>
          <TableColumn key="opciones">Opciones</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id_area}>
              <TableCell>{item.id_area}</TableCell>
              <TableCell>{item.nombre_area}</TableCell>
              <TableCell>{item.estado}</TableCell>
              <TableCell>
                <div className='flex'>
                  <MdBrowserUpdated className='size-6 mr-4' />
                  <RiDeleteBin5Fill className='size-6' />
                </div>              
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
