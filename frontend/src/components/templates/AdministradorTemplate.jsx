import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

export function AdministradorTemplate() {
  const[usuarios,setUsuarios]= useState([]);

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
  
  return (
    <Container>
        <h1>Usuarios Template</h1>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {usuario.id}
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
                      {usuario.tipo}
                  </td>
                  <td class="px-6 py-4">
                      <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Botones</a>
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