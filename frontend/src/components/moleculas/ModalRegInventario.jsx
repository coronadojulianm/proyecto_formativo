import { useState, useEffect } from 'react';
import axios from 'axios';

function ModalRegInventario() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    codigo_sena: '',
    estado: '',
    nombre_elemento: '',
    tipo_elemento: '',
    nota_cambio: '',
    cambios: 'no', // Inicialmente no hay cambios
    fk_ambiente: ''
  });
  
  const [ambientes, setAmbientes] = useState([]);

  useEffect(() => {
    const fetchAmbientes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/ambientes/listar");
        setAmbientes(response.data);
      } catch (error) {
        console.error("Error Fetching ambientes:", error);
      }
    };

    fetchAmbientes();
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

  const registrarElemento = async (event) => {
    try {
      event.preventDefault();
  
      // Enviar la nueva data al servidor
      await axios.post('http://localhost:3000/elemento/registrar', formData);
      alert('Elemento registrado');
      toggleModal();
      window.location.reload();
    } catch (error) {
      console.error('Error al registrar elemento:', error);
    }
  };

  return (
    <>
      <button onClick={toggleModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2" type="button">
        Registrar Elemento
      </button>

      {isOpen && (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between border-b pb-4">
              <h3 className="text-xl font-semibold text-black">Registrar Nuevo Elemento</h3>
              <button onClick={toggleModal} className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Cerrar modal</span>
              </button>
            </div>
            <div className="pt-4">
              <form onSubmit={registrarElemento}>
                <div className="mb-4">
                  <label htmlFor="codigo_sena" className="block text-gray-700 font-semibold">Código Sena:</label>
                  <input type="text" id="codigo_sena" name="codigo_sena" value={formData.codigo_sena} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="estado" className="block text-gray-700 font-semibold">Estado:</label>
                  <select id="estado" name="estado" value={formData.estado} onChange={handleChange} className="form-select mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required>
                    <option value="">Seleccionar Estado</option>
                    <option value="dañado">Dañado</option>
                    <option value="reparacion">Reparación</option>
                    <option value="Funcional">Funcional</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="nombre_elemento" className="block text-gray-700 font-semibold">Nombre Elemento:</label>
                  <input type="text" id="nombre_elemento" name="nombre_elemento" value={formData.nombre_elemento} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="tipo_elemento" className="block text-gray-700 font-semibold">Tipo Elemento:</label>
                  <select id="tipo_elemento" name="tipo_elemento" value={formData.tipo_elemento} onChange={handleChange} className="form-select mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required>
                    <option value="">Seleccionar Tipo de Elemento</option>
                    <option value="tecnologia">Tecnología</option>
                    <option value="mobiliario">Mobiliario</option>
                    <option value="material didactico">Material Didáctico</option>
                    <option value="suministros">Suministros</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="nota_cambio" className="block text-gray-700 font-semibold">Nota de Cambio:</label>
                  <textarea id="nota_cambio" name="nota_cambio" value={formData.nota_cambio} onChange={handleChange} className="form-textarea mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="cambios" className="block text-gray-700 font-semibold">¿Hubo cambios?</label>
                  <select id="cambios" name="cambios" value={formData.cambios} onChange={handleChange} className="form-select mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required>
                    <option value="no">No</option>
                    <option value="si">Sí</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="fk_ambiente" className="block text-gray-700 font-semibold">Ambiente:</label>
                  <select id="fk_ambiente" name="fk_ambiente" value={formData.fk_ambiente} onChange={handleChange} className="form-select mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required>
                    <option value="">Seleccionar Ambiente</option>
                    {ambientes.map((ambiente) => (
                      <option key={ambiente.id_ambiente} value={ambiente.id_ambiente}>{ambiente.nombre_ambiente}</option>
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

export default ModalRegInventario;






