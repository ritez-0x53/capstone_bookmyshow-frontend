import React from 'react'

const LastOrder = () => {
     return (
          <div className='last-order text-xs md:text-sm' >
               <h2 className='text-xl' >Last Booking Details</h2>
               <div className='seats'>
                    <h3>seats:</h3>
                    <p>A1:</p>
                    <p>A2:</p>
                    <p>A3:</p>
                    <p>A4:</p>
                    <p>D1:</p>
                    <p>D2:</p>
               </div>

               <div className='slot' >
                    <p>slot:</p>
               </div>

               <div className='movie'>
                    <p>movie:</p>
               </div>
          </div>
     )
}

export default LastOrder
