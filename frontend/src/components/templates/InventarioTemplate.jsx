import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalReg from "../moleculas/ModalRegInventario"
import ModalAct from "../moleculas/ModalActuInventario"

export function InventarioTemplate() {
    const [elementos, setElementos] = useState([]);
    const [ambientes, setAmbientes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseElementos = await axios.get("http://localhost:3000/elemento/listar");
                setElementos(responseElementos.data);

                const responseAmbientes = await axios.get("http://localhost:3000/ambientes/listar");
                setAmbientes(responseAmbientes.data);
            } catch (error) {
                console.error("Error Fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const EliminarElemento = async (id_elementos) => {
        try {
            await axios.delete(`http://localhost:3000/elemento/eliminar/${id_elementos}`);
            setElementos(elementos.filter((elemento) => elemento.id_elementos !== id_elementos));
            alert("Elemento Eliminado Correctamente");
        } catch (error) {
            console.error("Error al eliminar Elemento", error);
        }
    };

    const getNombreAmbiente = (idAmbiente) => {
        const ambiente = ambientes.find(ambiente => ambiente.id_ambiente === idAmbiente);
        return ambiente ? ambiente.nombre_ambiente : 'Ambiente no encontrado';
    };

    return (
        <Container>
            <div className="relative overflow-x-auto sm:rounded-lg">
                <h1 className="flex justify-center uppercase mb-5 bg-transparent">Tabla Elementos del Inventario</h1>
                <ModalReg />
                <table className="text-left rtl:text-right">
                    <thead className="text-xs text-white uppercase bg-green-800">
                        <tr>
                            <th scope="col" className="px-6 py-3 text">ID Elementos</th>
                            <th scope="col" className="px-6 py-3">Código Sena</th>
                            <th scope="col" className="px-6 py-3">Estado</th>
                            <th scope="col" className="px-6 py-3">Nombre Elemento</th>
                            <th scope="col" className="px-6 py-3">Tipo Elemento</th>
                            <th scope="col" className="px-6 py-3">Nota de Cambio</th>
                            <th scope="col" className="px-6 py-3">Cambios</th>
                            <th scope="col" className="px-6 py-3">Ambiente</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elementos.map((elemento) => (
                            <tr key={elemento.id_elementos} className="bg-green-700 text-white border-b border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    {elemento.id_elementos}
                                </th>
                                <td className="px-6 py-4">{elemento.codigo_sena}</td>
                                <td className="px-6 py-4">{elemento.estado}</td>
                                <td className="px-6 py-4">{elemento.nombre_elemento}</td>
                                <td className="px-6 py-4">{elemento.tipo_elemento}</td>
                                <td className="px-6 py-4">{elemento.nota_cambio}</td>
                                <td className="px-6 py-4">{elemento.cambios}</td>
                                <td className="px-6 py-4">{getNombreAmbiente(elemento.fk_ambiente)}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => EliminarElemento(elemento.id_elementos)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar</button>
                                    <ModalAct id_elementos={elemento.id_elementos} />
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

