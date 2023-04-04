import React from 'react'
import "./spinner.css"

function Spinner() {
     return (
          <div id='spinner' className='flex justify-center items-center text-center' >
               <div>
                    <div className="lds-ripple"><div></div><div></div></div>
                    <p className='text-red-500' >Loading please wait...</p>
               </div>
          </div>
     )
}

export default Spinner
