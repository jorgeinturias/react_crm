import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import IniciarSesion from './layout/IniciarSesion'
import Layout from './layout/Layout'
import Inicio from './paginas/Inicio'
import LoginForm from './paginas/LoginForm'
import NuevoCliente from './paginas/NuevoCliente'
import EditarClientes from './paginas/EditarClientes'
import VerCliente from './paginas/VerCliente'

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route>
            <Route path='/' element={<IniciarSesion/>}>
              <Route index element={<LoginForm/>} />
            </Route>
            <Route path='/clientes' element={<Layout/>}>
              <Route index element={<Inicio />} />
              <Route path='nuevo' element={<NuevoCliente />} />
              <Route path=':id' element={<VerCliente/>} />
              <Route path='editar/:id' element={<EditarClientes/>} />
            </Route>
            
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
