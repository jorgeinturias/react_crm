import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './spinner'

const Formulario = ({cliente, cargando}) => {
    
    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string().min(3, 'El nombre es muy corto').max(40, 'El nombre es muy largo').required('Nombre de Cliente es obligatorio'),
        empresa: Yup.string().required('Nombre de la Empresa es obligatorio'),
        email: Yup.string().email('Debe ser un email válido').required('El Email es obligatorio'),
        telefono: Yup.number().integer('Número no válido').positive('Número no válido').typeError('No es valido')
    })

    const handleSubmit = async(valores) => {
        try{
            let respuesta

            if(cliente.id){
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }else{
                const url = import.meta.env.VITE_API_URL
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }

            const resultado = await respuesta.json()    
            navigate('/clientes')

        } catch(error){
            console.log('Error');
        }
    }

  return (
      cargando ? <Spinner /> : (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-x1 uppercase text-center'>{cliente?.nombre ? 'Editar Cliente': 'Agregar Cliente'}</h1>
            <Formik 
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? ''
                }}

                enableReinitialize={true}
                onSubmit={ async (values, {resetForm}) => {
                    await handleSubmit(values)

                    resetForm()
                }}
                validationSchema={nuevoClienteSchema}
            >
                { ({errors, touched}) =>{
                    //console.log(data)
                    return(
                
                <Form className="mt-10">
                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor='nombre'>Nombre:</label>
                        <Field className="mt-2 block w-full p-3 bg-gray-50" id="nombre" type="text" placeholder="Nombre del cliente" name="nombre"/>
                        { errors.nombre && touched.nombre ?(
                            <Alerta>{errors.nombre}</Alerta>
                            )
                            :null }
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor='empresa'>Empresa:</label>
                        <Field className="mt-2 block w-full p-3 bg-gray-50" id="empresa" type="text" placeholder="Empresa del cliente" name="empresa" />
                        { errors.empresa && touched.empresa ?(
                            <Alerta>{errors.empresa}</Alerta>
                            )
                            :null }
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor='email'>Email:</label>
                        <Field className="mt-2 block w-full p-3 bg-gray-50" id="email" type="email" placeholder="Email del cliente" name="email"/>
                        { errors.email && touched.email ?(
                            <Alerta>{errors.email}</Alerta>
                            )
                            :null }
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor='telefono'>Teléfono:</label>
                        <Field className="mt-2 block w-full p-3 bg-gray-50" id="telefono" type="tel" placeholder="Teléfono del cliente" name="telefono"/>
                        { errors.telefono && touched.telefono ?(
                            <Alerta>{errors.telefono}</Alerta>
                            )
                            :null }
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor='notas'>Notas:</label>
                        <Field className="mt-2 block w-full p-3 bg-gray-50" as="textarea" id="notas" type="tel" placeholder="Notas del cliente" name="notas"/>
                    </div>
                    <input type="submit" value={cliente?.nombre ? 'Editar Cliente': 'Agregar Cliente'} className='mt-5 p-3 bg-blue-800 font-bold text-white text-lg w-full hover:bg-blue-500 transition:background 0.3s ease'/>
                </Form>
                )}}
            </Formik>
        </div>
      )
  )
}

Formulario.defaultProps={
    cliente: {},
    cargando: false
}

export default Formulario