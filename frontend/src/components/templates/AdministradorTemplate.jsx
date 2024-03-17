import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

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

        <button data-modal-target="static-modal" data-modal-toggle="static-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          Registrar
        </button>

        <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-2xl max-h-full">

                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Static modal
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div class="p-4 md:p-5 space-y-4">
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                        </p>
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Unions General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                        </p>
                    </div>

                    <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="static-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                        <button data-modal-hide="static-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
                    </div>
                </div>
            </div>
        </div>



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
                    <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Actualizar</button>
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