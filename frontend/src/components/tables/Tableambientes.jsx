import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from '@nextui-org/react';
import { MdBrowserUpdated } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function AmbientesTable() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 2;

  useEffect(() => {
    axios.get('http://localhost:3000/ambientes/listar')
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
          <TableColumn key="id_ambiente">ID Ambiente</TableColumn>
          <TableColumn key="nombre_ambiente">Nombre Ambiente</TableColumn>
          <TableColumn key="estado_ambiente">Estado</TableColumn>
          <TableColumn key="fk_area">Area</TableColumn>
          <TableColumn key="opciones">Opciones</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id_ambiente}>
              <TableCell>{item.id_ambiente}</TableCell>
              <TableCell>{item.nombre_ambiente}</TableCell>
              <TableCell>{item.estado_ambiente}</TableCell>
              <TableCell>{item.fk_area}</TableCell>
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
