import  {Routes, Route} from 'react-router-dom';
import Home from './view/Home';
import Perfil from './view/Perfil';
import Usuarios from './view/Usuarios';
import Areas from './view/Areas';
import Novedades from './view/Novedades';
import Prestamos from './view/Prestamos';

export default function App(){
  return(
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/perfil' element={<Perfil/>}></Route>
        <Route path='/usuarios' element={<Usuarios/>}></Route>
        <Route path='/areas' element={<Areas/>}></Route>
        <Route path='/novedades' element={<Novedades/>}></Route>
        <Route path='/prestamos' element={<Prestamos/>}></Route>
      </Routes>
    </>
  )
}
