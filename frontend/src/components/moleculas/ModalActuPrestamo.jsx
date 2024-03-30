import { useState, useEffect } from 'react';
import axios from 'axios';

function ModalActuPrestamo({ id_prestamo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre_ambiente: '',
    fecha_prestamo: '',
    fecha_entrega: '',
    nombre_celador: '',
    observaciones: '',
    fk_usuario: '',
    fk_ambiente: ''
  });

  useEffect(() => {
    async function fetchPrestamoData() {
      try {
        const response = await axios.get(`http://localhost:3000/prestamos/consultar/${id_prestamo}`);
        const prestamoData = response.data[0]; // Obtenemos el primer elemento del array

        // Formatear las fechas antes de establecerlas en el estado
        const formattedFechaPrestamo = new Date(prestamoData.fecha_prestamo).toISOString().split('T')[0];
        const formattedFechaEntrega = new Date(prestamoData.fecha_entrega).toISOString().split('T')[0];

        // Actualizamos el estado del formulario con los datos recuperados
        setFormData({
          ...prestamoData,
          fecha_prestamo: formattedFechaPrestamo,
          fecha_entrega: formattedFechaEntrega
        });
      } catch (error) {
        console.error('Error al obtener los datos del préstamo:', error);
      }
    }

    if (isOpen) {
      fetchPrestamoData();
    }
  }, [isOpen, id_prestamo]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleActualizar = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.put(`http://localhost:3000/prestamos/actualizar/${id_prestamo}`, formData);
      console.log('Préstamo actualizado:', response.data);
      alert('Préstamo actualizado con éxito');
      toggleModal();
      window.location.reload(); // Esto recargará la página para reflejar los cambios en la lista
    } catch (error) {
      console.error('Error al actualizar el préstamo:', error);
    }
  };

  return (
    <>
      <button onClick={toggleModal} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Actualizar</button>

      {isOpen && (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between border-b pb-4">
              <h3 className="text-xl font-semibold text-black">Actualizar Datos del Préstamo</h3>
              <button onClick={toggleModal} className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Cerrar modal</span>
              </button>
            </div>
            <form onSubmit={handleActualizar}>
              <div className="pt-4">
                <div className="mb-4">
                  <label htmlFor="nombre_ambiente" className="block text-gray-700 font-semibold">Nombre Ambiente:</label>
                  <input type="text" id="nombre_ambiente" name="nombre_ambiente" value={formData.nombre_ambiente} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="fecha_prestamo" className="block text-gray-700 font-semibold">Fecha Prestamo:</label>
                  <input type="date" id="fecha_prestamo" name="fecha_prestamo" value={formData.fecha_prestamo} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="fecha_entrega" className="block text-gray-700 font-semibold">Fecha Entrega:</label>
                  <input type="date" id="fecha_entrega" name="fecha_entrega" value={formData.fecha_entrega} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="nombre_celador" className="block text-gray-700 font-semibold">Nombre Celador:</label>
                  <input type="text" id="nombre_celador" name="nombre_celador" value={formData.nombre_celador} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="observaciones" className="block text-gray-700 font-semibold">Observaciones:</label>
                  <input type="text" id="observaciones" name="observaciones" value={formData.observaciones} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="fk_usuario" className="block text-gray-700 font-semibold">ID Usuario:</label>
                  <input type="text" id="fk_usuario" name="fk_usuario" value={formData.fk_usuario} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="fk_ambiente" className="block text-gray-700 font-semibold">ID Ambiente:</label>
                  <input type="text" id="fk_ambiente" name="fk_ambiente" value={formData.fk_ambiente} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">Actualizar</button>
                <button onClick={toggleModal} className="text-black bg-gray-200 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">Cerrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalActuPrestamo;

