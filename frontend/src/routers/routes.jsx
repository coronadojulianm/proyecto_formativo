import { Routes, Route } from "react-router-dom";
import { Home, Admin , Inventario , Reportes, Configuracion } from "../index";
export function MyRoutes() {
  return ( 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/inventario" element={<Inventario/>}/>
        <Route path="/reportes" element={<Reportes/>}/>
        <Route path="/configuracion" element={<Configuracion/>}/>

      </Routes>
    
      
  );
}
