import { useState } from 'react';
import axios from 'axios';

function ModalRegNovedad() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    tipo_novedad: '',
    descripcion_novedad: '',
    responsable_registro: '',
    fecha_novedad: '',
    fk_id_prestamo: ''
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

  const registrarNovedad = async (event) => {
    try {
      event.preventDefault();

      await axios.post('http://localhost:3000/novedad/registrar', formData);
      alert('Novedad registrada');
      toggleModal();
      window.location.reload();
    } catch (error) {
      console.error('Error al registrar novedad:', error);
    }
  };

  return (
    <>
      <button onClick={toggleModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2" type="button">
        Registrar Novedad
      </button>

      {isOpen && (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between border-b pb-4">
              <h3 className="text-xl font-semibold text-black">Registrar Nueva Novedad</h3>
              <button onClick={toggleModal} className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Cerrar modal</span>
              </button>
            </div>
            <div className="pt-4">
              <form onSubmit={registrarNovedad}>
                <div className="mb-4">
                  <label htmlFor="tipo_novedad" className="block text-gray-700 font-semibold">Tipo de Novedad:</label>
                  <input type="text" id="tipo_novedad" name="tipo_novedad" value={formData.tipo_novedad} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="descripcion_novedad" className="block text-gray-700 font-semibold">Descripción:</label>
                  <input type="text" id="descripcion_novedad" name="descripcion_novedad" value={formData.descripcion_novedad} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="responsable_registro" className="block text-gray-700 font-semibold">Responsable de Registro:</label>
                  <input type="text" id="responsable_registro" name="responsable_registro" value={formData.responsable_registro} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="fecha_novedad" className="block text-gray-700 font-semibold">Fecha de Novedad:</label>
                  <input type="date" id="fecha_novedad" name="fecha_novedad" value={formData.fecha_novedad} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="fk_id_prestamo" className="block text-gray-700 font-semibold">ID del Préstamo:</label>
                  <input type="text" id="fk_id_prestamo" name="fk_id_prestamo" value={formData.fk_id_prestamo} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
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

export default ModalRegNovedad;
