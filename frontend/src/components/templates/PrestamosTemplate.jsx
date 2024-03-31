import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalReg from "../moleculas/ModalRegPrestamo";
import ModalAct from "../moleculas/ModalActuPrestamo";

export function PrestamosTemplate() {
    const [prestamos, setPrestamos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/prestamos/listar");
                setPrestamos(response.data);
            } catch (error) {
                console.error("Error Fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const EliminarPrestamo = async (id_prestamo) => {
        try {
            await axios.delete(`http://localhost:3000/prestamos/eliminar/${id_prestamo}`);
            setPrestamos(prestamos.filter((prestamo) => prestamo.id_prestamo !== id_prestamo));
            alert("Prestamo Eliminado Correctamente");
        } catch (error) {
            console.error("Error al eliminar Prestamo", error);
        }
    };

    return (
        <Container>
            <div className="relative overflow-x-auto sm:rounded-lg">
                <h1 className="flex justify-center uppercase mb-5 bg-transparent">Tabla Prestamos registrados</h1>
                <ModalReg />
                <table className="text-left rtl:text-right">
                    <thead className="text-xs text-white uppercase bg-green-800">
                        <tr>
                            <th scope="col" className="px-6 py-3 text">ID</th>
                            <th scope="col" className="px-6 py-3">Nombre Ambiente</th>
                            <th scope="col" className="px-6 py-3">Fecha Prestamo</th>
                            <th scope="col" className="px-6 py-3">Fecha Entrega</th>
                            <th scope="col" className="px-6 py-3">Nombre Celador</th>
                            <th scope="col" className="px-6 py-3">Observaciones</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prestamos.map((prestamo) => (
                            <tr key={prestamo.id_prestamo} className="bg-green-700 text-white border-b border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    {prestamo.id_prestamo}
                                </th>
                                <td className="px-6 py-4">{prestamo.nombre_ambiente}</td>
                                <td className="px-6 py-4">{prestamo.fecha_prestamo}</td>
                                <td className="px-6 py-4">{prestamo.fecha_entrega}</td>
                                <td className="px-6 py-4">{prestamo.nombre_celador}</td>
                                <td className="px-6 py-4">{prestamo.observaciones}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => EliminarPrestamo(prestamo.id_prestamo)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar</button>
                                    <ModalAct id_prestamo={prestamo.id_prestamo} />
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

