import { useState } from 'react';
import axios from 'axios';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    identificacion: '',
    telefono: '',
    correo: '',
    contraseña: '',
    tipo_usuario: 'celador',
    estado_usuario: 'activo'
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
  
  const registrarUsuario = async (event) => {
    try {
      event.preventDefault(); // Prevenir el envío predeterminado del formulario
  
      // Realizar la solicitud POST al servidor para registrar el usuario
      await axios.post('http://localhost:3000/usuarios/registrar', formData);
      alert('Usuario registrado');
      toggleModal();
      window.location.reload(); // Recargar la página para reflejar los cambios en la tabla
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };
  
  return (
    <>
      <button onClick={toggleModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2" type="button">
        Registrar Usuario
      </button>

      {isOpen && (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between border-b pb-4">
              <h3 className="text-xl font-semibold text-black">Registrar Nuevo Usuario</h3>
              <button onClick={toggleModal} className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="pt-4">
            <form onSubmit={registrarUsuario}>
              <div className="mb-4">
                <label htmlFor="nombre" className="block text-gray-700 font-semibold">Nombre:</label>
                <input  type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-black rounded-md" required />
              </div>
              <div className="mb-4">
                <label htmlFor="identificacion" className="block text-gray-700 font-semibold">Identificación:</label>
                <input type="text" id="identificacion" name="identificacion" value={formData.identificacion} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-black rounded-md" required />
              </div>
              <div className="mb-4">
                <label htmlFor="telefono" className="block text-gray-700 font-semibold">Teléfono:</label>
                <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-black rounded-md" required />
              </div>
              <div className="mb-4">
                <label htmlFor="correo" className="block text-gray-700 font-semibold">Correo:</label>
                <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-black rounded-md" required />
              </div>
              <div className="mb-4">
                <label htmlFor="contraseña" className="block text-gray-700 font-semibold">Contraseña:</label>
                <input type="password" id="contraseña" name="contraseña" value={formData.contraseña} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-black rounded-md" required />
              </div>
              <div className="mb-4">
                <label htmlFor="tipo_usuario" className="block text-gray-700 font-semibold">Tipo de Usuario:</label>
                <select id="tipo_usuario" name="tipo_usuario" value={formData.tipo_usuario} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-black rounded-md" required>
                  <option value="celador">Celador</option>
                  <option value="instructor">Instructor</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="estado_usuario" className="block text-gray-700 font-semibold">Estado de Usuario:</label>
                <select id="estado_usuario" name="estado_usuario" value={formData.estado_usuario} onChange={handleChange} className="form-input mt-1 block w-full text-black border-solid border-2 border-black rounded-md" required>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
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

export default Modal;
