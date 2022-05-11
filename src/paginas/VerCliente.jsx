import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import Spinner from '../components/spinner';

const VerCliente = () => {

  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)
  const { id } = useParams();

  useEffect(() => {
    
      const obtenerClienteAPI = async ()=> {
        try {
          const url = `${import.meta.env.VITE_API_URL}/${id}`
          const respuesta = await fetch(url);
          const resultado = await respuesta.json()
    
          setCliente(resultado);  
        } catch (error) {
          console.log(error);  
        }
        setCargando(!cargando)
      }
      obtenerClienteAPI()

  }, [])
  
  
  return (

    cargando ? 
      <Spinner /> : 
      Object.keys(cliente).length === 0 ? 
      <p>No hay Resultados</p>:
      (
        <div>
            <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {cliente.nombre}</h1>
            <p className='mt-3'>Información del cliente</p>
            { cliente.cliente && (
            <p className='text-2xl text-gray-700 mt-10'>
              <span className='uppercase font-bold mr-2'>Cliente:</span>
              {cliente.nombre}
            </p>
            )}
            { cliente.email && (
            <p className='text-2xl text-gray-700 mt-4'>
              <span className='uppercase font-bold mr-2'>Email:</span>
              {cliente.email}
            </p>
            )}
            { cliente.telefono && (
            <p className='text-2xl text-gray-700 mt-4'>
              <span className='uppercase font-bold mr-2'>Teléfono:</span>
              {cliente.telefono}
            </p>
            )}
            { cliente.empresa && (
            <p className='text-2xl text-gray-700 mt-4'>
              <span className='uppercase font-bold mr-2'>Empresa:</span>
              {cliente.empresa}
            </p>
            )}
            { cliente.notas && (
            <p className='text-2xl text-gray-700 mt-4'>
              <span className='uppercase font-bold mr-2'>Notas:</span>
              {cliente.notas}
            </p>
            )}
          </div>
      ) 
  ) 
}

export default VerCliente