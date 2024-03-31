import { useState, useEffect } from 'react';
import axios from 'axios';

function ModalActuNovedad({ id_novedad }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    tipo_novedad: '',
    descripcion_novedad: '',
    responsable_registro: '',
    fecha_novedad: '',
    fk_id_prestamo: ''
  });

  useEffect(() => {
    async function fetchNovedadData() {
      try {
        const response = await axios.get(`http://localhost:3000/novedad/consultar/${id_novedad}`);
        const novedadData = response.data[0]; // Obtenemos el primer elemento del array

        // Formatear la fecha antes de establecerla en el estado
        const formattedFechaNovedad = new Date(novedadData.fecha_novedad).toISOString().split('T')[0];

        // Actualizamos el estado del formulario con los datos recuperados
        setFormData({
          ...novedadData,
          fecha_novedad: formattedFechaNovedad
        });
      } catch (error) {
        console.error('Error al obtener los datos de la novedad:', error);
      }
    }

    if (isOpen) {
      fetchNovedadData();
    }
  }, [isOpen, id_novedad]);

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

      const response = await axios.put(`http://localhost:3000/novedad/actualizar/${id_novedad}`, formData);
      console.log('Novedad actualizada:', response.data);
      alert('Novedad actualizada con éxito');
      toggleModal();
      window.location.reload(); // Esto recargará la página para reflejar los cambios en la lista
    } catch (error) {
      console.error('Error al actualizar la novedad:', error);
    }
  };

  return (
    <>
      <button onClick={toggleModal} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Actualizar</button>

      {isOpen && (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between border-b pb-4">
              <h3 className="text-xl font-semibold text-black">Actualizar Datos de la Novedad</h3>
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
                  <label htmlFor="tipo_novedad" className="block text-gray-700 font-semibold">Tipo de Novedad:</label>
                  <input type="text" id="tipo_novedad" name="tipo_novedad" value={formData.tipo_novedad} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="descripcion_novedad" className="block text-gray-700 font-semibold">Descripción de la Novedad:</label>
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

export default ModalActuNovedad;
