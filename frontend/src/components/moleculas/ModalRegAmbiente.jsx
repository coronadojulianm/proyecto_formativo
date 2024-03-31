import { useState, useEffect } from 'react';
import axios from 'axios';

function ModalRegAmbiente() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre_ambiente: '',
    estado_ambiente: '',
    fk_area: '' // Agregado el campo fk_area
  });
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/area/listar');
        setAreas(response.data);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };
    fetchAreas();
  }, []);

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

  const registrarAmbiente = async (event) => {
    try {
      event.preventDefault();
      console.log('Datos a enviar:', formData);
      await axios.post('http://localhost:3000/ambientes/registrar', formData);
      alert('Ambiente registrado');
      toggleModal();
      window.location.reload();
    } catch (error) {
      console.error('Error al registrar ambiente:', error);
    }
  };
  
  return (
    <>
      <button onClick={toggleModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2" type="button">
        Registrar Ambiente
      </button>

      {isOpen && (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between border-b pb-4">
              <h3 className="text-xl font-semibold text-black">Registrar Nuevo Ambiente</h3>
              <button onClick={toggleModal} className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Cerrar modal</span>
              </button>
            </div>
            <div className="pt-4">
              <form onSubmit={registrarAmbiente}>
                <div className="mb-4">
                  <label htmlFor="nombre_ambiente" className="block text-gray-700 font-semibold">Nombre del Ambiente:</label>
                  <input type="text" id="nombre_ambiente" name="nombre_ambiente" value={formData.nombre_ambiente} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="estado_ambiente" className="block text-gray-700 font-semibold">Estado del Ambiente:</label>
                  <select id="estado_ambiente" name="estado_ambiente" value={formData.estado_ambiente} onChange={handleChange} className="form-select mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required>
                    <option value="">Seleccionar Estado</option>
                    <option value="ocupado">Ocupado</option>
                    <option value="libre">Libre</option>
                    <option value="inaccesible">Inaccesible</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="fk_area" className="block text-gray-700 font-semibold">Área:</label>
                  <select id="fk_area" name="fk_area" value={formData.fk_area} onChange={handleChange} className="form-select mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required>
                    <option value="">Seleccionar Área</option>
                    {areas.map((area) => (
                      <option key={area.id_area} value={area.id_area}>{area.nombre_area}</option>
                    ))}
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

export default ModalRegAmbiente;

