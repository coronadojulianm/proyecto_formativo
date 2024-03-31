import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalAct from "../moleculas/ModalActuReportes"
import ModalReg from '../moleculas/ModalRegReportes'

export function ReportesTemplate() {
  const [novedades, setNovedades] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/novedad/listar");
                setNovedades(response.data);
            } catch (error) {
                console.error("Error Fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const EliminarNovedad = async (id_novedad) => {
        try {
            await axios.delete(`http://localhost:3000/novedad/eliminar/${id_novedad}`);
            setNovedades(novedades.filter((novedad) => novedad.id_novedad !== id_novedad));
            alert("Novedad Eliminada Correctamente");
        } catch (error) {
            console.error("Error al eliminar Novedad", error);
        }
    };
  return (
    <Container>
      <div className="relative overflow-x-auto sm:rounded-lg">
                <h1 className="flex justify-center uppercase mb-5 bg-transparent">Tabla Novedades registradas</h1>
                <ModalReg />
                <table className="text-left rtl:text-right">
                    <thead className="text-xs text-white uppercase bg-green-800">
                        <tr>
                            <th scope="col" className="px-6 py-3 text">ID</th>
                            <th scope="col" className="px-6 py-3">Tipo Novedad</th>
                            <th scope="col" className="px-6 py-3">Descripcion</th>
                            <th scope="col" className="px-6 py-3">Responsable</th>
                            <th scope="col" className="px-6 py-3">Fecha Novedad</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {novedades.map((novedad) => (
                            <tr key={novedad.id_novedad} className="bg-green-700 text-white border-b border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    {novedad.id_novedad}
                                </th>
                                <td className="px-6 py-4">{novedad.tipo_novedad}</td>
                                <td className="px-6 py-4">{novedad.descripcion_novedad}</td>
                                <td className="px-6 py-4">{novedad.responsable_registro}</td>
                                <td className="px-6 py-4">{novedad.fecha_novedad}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => EliminarNovedad(novedad.id_novedad)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar</button>
                                    <ModalAct id_novedad={novedad.id_novedad} />
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