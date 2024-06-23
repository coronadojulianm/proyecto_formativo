import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from '@nextui-org/react';
import { MdBrowserUpdated } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function UsuariosTable() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    axios.get('http://localhost:3000/usuarios/listar')
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
          <TableColumn key="id_usuario">ID Usuario</TableColumn>
          <TableColumn key="nombre">Nombre</TableColumn>
          <TableColumn key="identificacion">Identificación</TableColumn>
          <TableColumn key="telefono">Teléfono</TableColumn>
          <TableColumn key="correo">Correo</TableColumn>
          <TableColumn key="tipo_usuario">Tipo de usuario</TableColumn>
          <TableColumn key="estado_usuario">Estado de usuario</TableColumn>
          <TableColumn key="opciones">Opciones</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id_usuario}>
              <TableCell>{item.id_usuario}</TableCell>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{item.identificacion}</TableCell>
              <TableCell>{item.telefono}</TableCell>
              <TableCell>{item.correo}</TableCell>
              <TableCell>{item.tipo_usuario}</TableCell>
              <TableCell>{item.estado_usuario}</TableCell>
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
