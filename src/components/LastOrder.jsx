import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const LastOrder = () => {
     const shows = useSelector(state => state.shows)

     useEffect(() => {
          localStorage.setItem("bookedshows", JSON.stringify(shows.shows))
     }, [shows])

     let lastbookingShow;
     lastbookingShow = shows.shows[shows.shows.length - 1]

     return (
          lastbookingShow ? lastbookingShow.length == 0 ? <div className='text-red-500 last-order text-xs md:text-sm' >No previous booking</div> :
               <div className='last-order text-xs md:text-sm' >
                    <h2 className='text-xl' >Last Booking Details</h2>
                    <div className='seats'>
                         <h3>seats:</h3>
                         <p>A1:{lastbookingShow.A1}</p>
                         <p>A2:{lastbookingShow.A2}</p>
                         <p>A3:{lastbookingShow.A3}</p>
                         <p>A4:{lastbookingShow.A4}</p>
                         <p>D1:{lastbookingShow.D1}</p>
                         <p>D2:{lastbookingShow.D2}</p>
                    </div>

                    <div className='slot' >
                         <p>slot:{lastbookingShow.timeSlot}</p>
                    </div>

                    <div className='movie'>
                         <p>movie:{lastbookingShow.movieName}</p>
                    </div>

               </div> : <p className='text-2xl text-center text-green-500 my-10' >Loading...</p>
     )
}


export default LastOrder
