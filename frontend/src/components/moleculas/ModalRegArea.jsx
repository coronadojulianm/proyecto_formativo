import { useState } from 'react';
import axios from 'axios';

function ModalRegArea() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre_area: '',
    estado: '' // Cambiado de estado_area a estado
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

  const registrarArea = async (event) => {
    try {
      event.preventDefault();
  
      // Log de los datos antes de enviar la solicitud axios
      console.log('Datos a enviar:', formData);
  
      await axios.post('http://localhost:3000/area/registrar', formData);
      alert('Área registrada');
      toggleModal();
      window.location.reload();
    } catch (error) {
      console.error('Error al registrar área:', error);
    }
  };
  

  return (
    <>
      <button onClick={toggleModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2" type="button">
        Registrar Área
      </button>

      {isOpen && (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between border-b pb-4">
              <h3 className="text-xl font-semibold text-black">Registrar Nueva Área</h3>
              <button onClick={toggleModal} className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Cerrar modal</span>
              </button>
            </div>
            <div className="pt-4">
              <form onSubmit={registrarArea}>
                <div className="mb-4">
                  <label htmlFor="nombre_area" className="block text-gray-700 font-semibold">Nombre del Área:</label>
                  <input type="text" id="nombre_area" name="nombre_area" value={formData.nombre_area} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="estado" className="block text-gray-700 font-semibold">Estado del Área:</label>
                  <select id="estado" name="estado" value={formData.estado} onChange={handleChange} className="form-select mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required>
                    <option value="">Seleccionar Estado</option>
                    <option value="ocupado">Ocupado</option>
                    <option value="libre">Libre</option>
                    <option value="inaccesible">Inaccesible</option>
                  </select>
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

export default ModalRegArea;

