import { useState } from 'react';
import axios from 'axios';

function Modal() {
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
  
  const registrarPrestamo = async (event) => {
    try {
      event.preventDefault();
  
      await axios.post('http://localhost:3000/prestamos/registrar', formData);
      alert('Préstamo registrado');
      toggleModal();
      window.location.reload();
    } catch (error) {
      console.error('Error al registrar préstamo:', error);
    }
  };
  
  return (
    <>
      <button onClick={toggleModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2" type="button">
        Registrar Préstamo
      </button>

      {isOpen && (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between border-b pb-4">
              <h3 className="text-xl font-semibold text-black">Registrar Nuevo Préstamo</h3>
              <button onClick={toggleModal} className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Cerrar modal</span>
              </button>
            </div>
            <div className="pt-4">
            <form onSubmit={registrarPrestamo}>
              <div className="mb-4">
                <label htmlFor="nombre_ambiente" className="block text-gray-700 font-semibold">Nombre del Ambiente:</label>
                <input  type="text" id="nombre_ambiente" name="nombre_ambiente" value={formData.nombre_ambiente} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
              </div>
              <div className="mb-4">
                <label htmlFor="fecha_prestamo" className="block text-gray-700 font-semibold">Fecha de Préstamo:</label>
                <input type="date" id="fecha_prestamo" name="fecha_prestamo" value={formData.fecha_prestamo} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
              </div>
              <div className="mb-4">
                <label htmlFor="fecha_entrega" className="block text-gray-700 font-semibold">Fecha de Entrega:</label>
                <input type="date" id="fecha_entrega" name="fecha_entrega" value={formData.fecha_entrega} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
              </div>
              <div className="mb-4">
                <label htmlFor="nombre_celador" className="block text-gray-700 font-semibold">Nombre del Celador:</label>
                <input type="text" id="nombre_celador" name="nombre_celador" value={formData.nombre_celador} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
              </div>
              <div className="mb-4">
                <label htmlFor="observaciones" className="block text-gray-700 font-semibold">Observaciones:</label>
                <input type="text" id="observaciones" name="observaciones" value={formData.observaciones} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
              </div>
              <div className="mb-4">
                <label htmlFor="fk_usuario" className="block text-gray-700 font-semibold">ID del Usuario:</label>
                <input type="text" id="fk_usuario" name="fk_usuario" value={formData.fk_usuario} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
              </div>
              <div className="mb-4">
                <label htmlFor="fk_ambiente" className="block text-gray-700 font-semibold">ID del Ambiente:</label>
                <input type="text" id="fk_ambiente" name="fk_ambiente" value={formData.fk_ambiente} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
              </div>
              <div className="flex justify-end pt-4">
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">Registrar</button>
                  <button onClick={toggleModal} className="text-black bg-gray-200 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">Cerrar</button>
              </div>
            </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
