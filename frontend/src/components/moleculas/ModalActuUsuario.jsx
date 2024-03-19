import { useState, useEffect } from 'react';
import axios from 'axios';

function ActualizarModal({ id_usuario }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    identificacion: '',
    telefono: '',
    correo: '',
    contraseña: '',
    tipo_usuario: '',
    estado_usuario: ''
  });

  useEffect(() => {

    
    async function fetchUserData() {
      try {
        const response = await axios.get(`http://localhost:3000/usuarios/buscar/${id_usuario}`);
        const userData = response.data;
        setFormData(userData);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    }

    

    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen, id_usuario]);

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
  
      const response = await axios.put(`http://localhost:3000/usuarios/actualizar/${id_usuario}`, formData);
      console.log('Usuario actualizado:', response.data);
      alert('Usuario actualizado con éxito');
      toggleModal();
      window.location.reload(); // Esto recargará la página para reflejar los cambios en la lista
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };
  

  return (
    <>
      <button onClick={toggleModal} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Actualizar</button>

      {isOpen && (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between border-b pb-4">
              <h3 className="text-xl font-semibold text-black">Actualizar Datos</h3>
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
                    <label htmlFor="nombre" className="block text-gray-700 font-semibold">Nombre:</label>
                    <input  type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="identificacion" className="block text-gray-700 font-semibold">Identificación:</label>
                    <input type="text" id="identificacion" name="identificacion" value={formData.identificacion} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="telefono" className="block text-gray-700 font-semibold">Teléfono:</label>
                    <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="correo" className="block text-gray-700 font-semibold">Correo:</label>
                    <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="contraseña" className="block text-gray-700 font-semibold">Contraseña:</label>
                    <input type="password" id="contraseña" name="contraseña" value={formData.contraseña} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="tipo_usuario" className="block text-gray-700 font-semibold">Tipo de Usuario:</label>
                  <select id="tipo_usuario" name="tipo_usuario" value={formData.tipo_usuario} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required>
                    <option value="celador">Celador</option>
                    <option value="instructor">Instructor</option>
                    <option value="administrador">Administrador</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="estado_usuario" className="block text-gray-700 font-semibold">Estado de Usuario:</label>
                  <select id="estado_usuario" name="estado_usuario" value={formData.estado_usuario} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-gray-400 rounded-md" required>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
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

export default ActualizarModal;

