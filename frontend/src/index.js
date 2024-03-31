export { default as App, ThemeContext } from './App';
export { AuthContextProvider, UserAuth } from './context/authContext';
export {  } from './main';


export { Home } from './pages/home';
export { Admin } from './pages/Administrador';
export { Inventario } from './pages/Inventario';
export { Reportes } from './pages/Reportes';
export { Configuracion } from './pages/Configuracion';
export { Prestamos } from './pages/Prestamos';
export { Areas } from './pages/Areas'

export { MyRoutes } from './routers/routes';



export { supabase } from './supabase/supabase.config';
export { DataModulosConfiguracion, DesplegableUser, LinksArray, SecondarylinksArray, TemasData, TipoDocData, TipouserData } from './utils/dataEstatica';
export * from './components';
export * from './components/organismos/sidebar/Sidebar'
export * from './components/organismos/sidebar/SidebarCard'
export * from './components/organismos/ToggleTema'
export * from './components/organismos/MenuHambur'
export * from './styles'
