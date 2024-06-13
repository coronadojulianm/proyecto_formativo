import  {Routes, Route} from 'react-router-dom'
import Home from './view/Home'
export default function App(){
  return(
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
    </>
  )
}
