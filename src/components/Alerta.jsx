import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className="bg-red-600 my-4 font-bold p-3 uppercase text-white text-center">{children}</div>
  )
}

export default Alerta