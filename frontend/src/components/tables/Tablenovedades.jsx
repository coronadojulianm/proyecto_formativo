import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from '@nextui-org/react';
import { MdBrowserUpdated } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { format } from 'date-fns'; // Importa la función format de date-fns

export default function NovedadesTable() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    axios.get('http://localhost:3000/novedad/listar')
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

  // Función para formatear la fecha
  const formatFecha = (fecha) => {
    // Aquí puedes ajustar el formato de la fecha como desees
    return format(new Date(fecha), 'yyyy-MM-dd'); // Ejemplo: 2024-03-31
  };

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
          <TableColumn key="id_novedad ">ID Novedad</TableColumn>
          <TableColumn key="tipo_novedad">Tipo Novedad</TableColumn>
          <TableColumn key="descripcion_novedad">Descripcion</TableColumn>
          <TableColumn key="responsable_registro">Encargado</TableColumn>
          <TableColumn key="fecha_novedad">Fecha</TableColumn>
          <TableColumn key="fk_id_prestamo ">ID Prestamo</TableColumn>
          <TableColumn key="opciones">Opciones</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id_novedad}>
                <TableCell key="id_novedad">{item.id_novedad}</TableCell>
                <TableCell key="tipo_novedad">{item.tipo_novedad}</TableCell>
                <TableCell key="descripcion_novedad">{item.descripcion_novedad}</TableCell>
                <TableCell key="responsable_registro">{item.responsable_registro}</TableCell>
                <TableCell key="fecha_novedad">{formatFecha(item.fecha_novedad)}</TableCell>
                <TableCell key="fk_id_prestamo">{item.fk_id_prestamo}</TableCell>
                <TableCell key="opciones">
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
