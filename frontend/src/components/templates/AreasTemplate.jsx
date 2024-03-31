import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalReg from '../moleculas/ModalRegArea'
import ModalAct from '../moleculas/ModalActuArea'

export function AreasTemplate() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/area/listar");
        setAreas(response.data);
      } catch (error) {
        console.error("Error Fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const eliminarArea = async (id_area) => {
    try {
      await axios.delete(`http://localhost:3000/area/eliminar/${id_area}`);
      setAreas(areas.filter((area) => area.id_area !== id_area));
      alert("Área Eliminada Correctamente");
    } catch (error) {
      console.error("Error al eliminar Área", error);
    }
  };

  return (
    <Container>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <h1 className="flex justify-center uppercase mb-5 bg-transparent">Tabla de Áreas registradas</h1>
        <ModalReg /> 
        <table className="text-left rtl:text-right">
          <thead className="text-xs text-white uppercase bg-green-800">
            <tr>
              <th scope="col" className="px-6 py-3 text">ID</th>
              <th scope="col" className="px-6 py-3">Nombre del Área</th>
              <th scope="col" className="px-6 py-3">Estado</th>
              <th scope="col" className="px-6 py-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {areas.map((area) => (
              <tr key={area.id_area} className="bg-green-700 text-white border-b border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                  {area.id_area}
                </th>
                <td className="px-6 py-4">{area.nombre_area}</td>
                <td className="px-6 py-4">{area.estado}</td>
                <td className="px-6 py-4">
                  <button onClick={() => eliminarArea(area.id_area)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar</button>
                  <ModalAct id_area={area.id_area} />
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
