import React from 'react'
import {useNavigate} from 'react-router-dom'

const Cliente = ({cliente, handleEliminar}) => {

    const navigate = useNavigate()
    const {nombre, empresa, email, telefono, notas, id} = cliente
  
    return (
    <tr className='border-b hover:bg-gray-50'>
        <td className='p-3'>{nombre}</td>
        <td className='p-3'>
            <p><span className='text-gray-800 uppercase font-bold'>Email:</span> {email}</p>
            <p><span className='text-gray-800 uppercase font-bold'>Teléfono:</span> {telefono}</p>
        </td>
        <td className='p-3'>{empresa}</td>
        <td className='p-3'>
            <button 
                onClick={()=>{navigate(`/clientes/${id}`)}}
                className='bg-yellow-500 text-white block w-full p-2 uppercase font-bold text-xs hover:bg-yellow-400'
                type='button'>
                    Ver
                </button>
            <button 
                onClick={()=>{navigate(`/clientes/editar/${id}`)}}
                className='bg-blue-800 text-white block w-full p-2 uppercase font-bold text-xs mt-3 hover:bg-blue-400'
                type='button'>
                    Editar
                </button>
            <button 
                className='bg-red-800 text-white block w-full p-2 uppercase font-bold text-xs mt-3 hover:bg-red-400'
                onClick={ ()=>handleEliminar(id) }
                type='button'>
                    Eliminar
                </button>
        </td>
    </tr>
  )
}

export default Cliente