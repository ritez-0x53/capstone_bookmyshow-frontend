import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchData } from '../features/shows/showSlice'
import { useDispatch } from 'react-redux'
import Spinner from './Spinner'

const LastOrder = () => {
     const dispatch = useDispatch()
     const shows = useSelector(state => state.shows)
     const status = useSelector(state => state.shows.status)

     useEffect(() => {
          dispatch(fetchData());
     }, [])

     useEffect(() => {
          localStorage.setItem("bookedshows", JSON.stringify(shows.shows))
     }, [shows])

     let lastbookingShow;
     lastbookingShow = shows.shows[shows.shows.length - 1]

     if (status === "LOADING") {
          // return <p className='last-order text-2xl text-center text-green-500 py-6' >Loading...</p>
          return <Spinner />
     }
     if (status === "IDLE") {
          return (
               shows.shows.length === 0 ? <p className='last-order py-4 text-red-600 text-xs md:text-sm' >No Previous Booking</p> :
                    <div className='last-order text-xs md:text-sm' >
                         <h2 className='text-xl' >Last Booking Details</h2>
                         <div className='seats'>
                              <h3><b>seats</b>:</h3>
                              <p><b>A1</b>:{lastbookingShow.A1}</p>
                              <p><b>A2</b>:{lastbookingShow.A2}</p>
                              <p><b>A3</b>:{lastbookingShow.A3}</p>
                              <p><b>A4</b>:{lastbookingShow.A4}</p>
                              <p><b>D1</b>:{lastbookingShow.D1}</p>
                              <p><b>D2</b>:{lastbookingShow.D2}</p>
                         </div>

                        <div className='slot' >
                              <p><b>slot</b>:{lastbookingShow.timeSlot}</p>
                         </div>

                         <div className='movie'>
                              <p><b>movie</b>:{lastbookingShow.movieName}</p>
                         </div>

                    </div>
          )
     }
}


export default LastOrder
