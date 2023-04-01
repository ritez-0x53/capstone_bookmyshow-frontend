import React from 'react'

function Alert({ msg }) {
     return (
          <div className='alert text-red-500 text-lg'  >
               <p>{msg}</p>
          </div>
     )
}

export default Alert;
