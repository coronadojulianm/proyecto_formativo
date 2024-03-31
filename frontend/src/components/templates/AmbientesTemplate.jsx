import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalRegAmbiente from '../moleculas/ModalRegAmbiente'
import ModalActAmbiente from '../moleculas/ModalActuAmbiente'

export function AmbientesTemplate() {
  const [ambientes, setAmbientes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/ambientes/listar");
        setAmbientes(response.data);
      } catch (error) {
        console.error("Error Fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const eliminarAmbiente = async (id_ambiente) => {
    try {
      await axios.delete(`http://localhost:3000/ambientes/eliminar/${id_ambiente}`);
      setAmbientes(ambientes.filter((ambiente) => ambiente.id_ambiente !== id_ambiente));
      alert("Ambiente Eliminado Correctamente");
    } catch (error) {
      console.error("Error al eliminar Ambiente", error);
    }
  };

  return (
    <Container>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <h1 className="flex justify-center uppercase mb-5 bg-transparent">Tabla de Ambientes registrados</h1>
        <ModalRegAmbiente /> 
        <table className="text-left rtl:text-right">
          <thead className="text-xs text-white uppercase bg-green-800">
            <tr>
              <th scope="col" className="px-6 py-3 text">ID</th>
              <th scope="col" className="px-6 py-3">Nombre del Ambiente</th>
              <th scope="col" className="px-6 py-3">Estado</th>
              <th scope="col" className="px-6 py-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {ambientes.map((ambiente) => (
              <tr key={ambiente.id_ambiente} className="bg-green-700 text-white border-b border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                  {ambiente.id_ambiente}
                </th>
                <td className="px-6 py-4">{ambiente.nombre_ambiente}</td>
                <td className="px-6 py-4">{ambiente.estado_ambiente}</td>
                <td className="px-6 py-4">
                  <button onClick={() => eliminarAmbiente(ambiente.id_ambiente)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar</button>
                  <ModalActAmbiente id_ambiente={ambiente.id_ambiente} />
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
