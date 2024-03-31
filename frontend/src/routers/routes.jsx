import { Routes, Route } from "react-router-dom";
import { Home, Admin , Inventario , Reportes, Configuracion, Prestamos } from "../index";
export function MyRoutes() {
  return ( 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/inventario" element={<Inventario/>}/>
        <Route path="/novedades" element={<Reportes/>}/>
        <Route path="/configuracion" element={<Configuracion/>}/>
        <Route path="/prestamos" element={<Prestamos/>}/>

      </Routes>
    
      
  );
}
