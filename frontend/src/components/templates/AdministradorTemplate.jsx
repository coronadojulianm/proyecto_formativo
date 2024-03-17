import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../moleculas/ModalRegUsuario"
import ModalAct from "../moleculas/ModalActuUsuario"

export function AdministradorTemplate() {
  const[usuarios,setUsuarios]= useState([]);

  // CONEXION LISTAR USUARIOS
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const response = await axios.get(
          "http://localhost:3000/usuarios/listar"
        );
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error Fetching data:",error);
      }
    };
    fetchData();
    
  },[]);
  // CONEXION ELIMINAR USUARIOS
  const EliminarUsuario = async (id_usuario) => {
    try {
      // SOLICITUD DE ELIMINAR
      await axios.delete(`http://localhost:3000/usuarios/eliminar/${id_usuario}`);
      // Actualizar la lista
      setUsuarios(usuarios.filter((usuario) => usuario.id_usuario !== id_usuario));
      alert("Usuario eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar usuario", error);
    }
  };

  
  return (
    <Container>
      <div class="relative overflow-x-auto sm:rounded-lg">
        <h1 class=" flex justify-center uppercase mb-5 bg-transparent">Tabla usuarios registrados</h1>
        <Modal/>
          <table class="text-left rtl:text-right text-white dark:text-white">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-green-900 dark:text-gray-400">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                          ID
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Nombre
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Identificacion
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Telefono
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Correo
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Tipo
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario)=>(
                  <tr class="bg-white border-b dark:bg-green-700 dark:border-gray-700">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {usuario.id_usuario}
                  </th>
                  <td class="px-6 py-4">
                      {usuario.nombre}
                  </td>
                  <td class="px-6 py-4">
                      {usuario.identificacion}
                  </td>
                  <td class="px-6 py-4">
                      {usuario.telefono}
                  </td>
                  <td class="px-6 py-4">
                      {usuario.correo}
                  </td>
                  <td class="px-6 py-4">
                      {usuario.tipo_usuario}
                  </td>
                  <td class="px-6 py-4">
                    <button onClick={()=> EliminarUsuario(usuario.id_usuario)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar</button>
                    <ModalAct id_usuario={usuario.id_usuario}/>
                  </td>
              </tr>
                ))}                
              </tbody>
          </table>
      </div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  width: 100%;
`;