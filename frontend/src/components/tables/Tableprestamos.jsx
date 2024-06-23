import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from '@nextui-org/react';
import { MdBrowserUpdated } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { format } from 'date-fns'; // Importa la función format de date-fns

export default function TablePrestamos() {
  const [prestamos, setPrestamos] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    axios.get('http://localhost:3000/prestamos/listar')
      .then(response => {
        setPrestamos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (prestamos.length === 0) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se carga la data
  }

  const pages = Math.ceil(prestamos.length / rowsPerPage);

  const items = prestamos.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Función para formatear la fecha
  const formatFecha = (fecha) => {
    return format(new Date(fecha), 'yyyy-MM-dd'); // Formato deseado: 2024-03-31
  };

  return (
    <div className="flex flex-col items-center">
      <Table 
        aria-label="Tabla de Prestamos"
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
          <TableColumn>ID Prestamo</TableColumn>
          <TableColumn>Nombre Ambiente</TableColumn>
          <TableColumn>Fecha Prestamo</TableColumn>
          <TableColumn>Fecha Entrega</TableColumn>
          <TableColumn>Nombre Celador</TableColumn>
          <TableColumn>Observaciones</TableColumn>
          <TableColumn>Usuario Dependiente</TableColumn>
          <TableColumn>Ambiente Usado</TableColumn>
          <TableColumn>Opciones</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {items.map((item) => (
            <TableRow key={item.id_prestamo}>
              <TableCell>{item.id_prestamo}</TableCell>
              <TableCell>{item.nombre_ambiente}</TableCell>
              <TableCell>{formatFecha(item.fecha_prestamo)}</TableCell>
              <TableCell>{formatFecha(item.fecha_entrega)}</TableCell>
              <TableCell>{item.nombre_celador}</TableCell>
              <TableCell>{item.observaciones}</TableCell>
              <TableCell>{item.fk_usuario}</TableCell>
              <TableCell>{item.fk_ambiente}</TableCell>
              <TableCell>
                <div className='flex'>
                  <MdBrowserUpdated className='size-6 mr-4' />
                  <RiDeleteBin5Fill className='size-6' />
                </div>              
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
