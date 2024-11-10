import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchData } from '../features/shows/showSlice'
import Spinner from './Spinner'

const LastOrder = () => {
    // Initialize dispatch to dispatch actions
    const dispatch = useDispatch()

    // Select the shows state from the Redux store
    const shows = useSelector(state => state.shows)

    // Select the status of shows fetching from the Redux store
    const status = useSelector(state => state.shows.status)

    // Fetch shows data when the component mounts
    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch])

    // Save the fetched shows to localStorage whenever shows state changes
    useEffect(() => {
        localStorage.setItem("bookedshows", JSON.stringify(shows.shows))
    }, [shows])

    let lastBookingShow

    // Get the last booked show from the shows array
    if (shows.shows.length > 0) {
        lastBookingShow = shows.shows[shows.shows.length - 1]
    }

    // If data is currently loading, display the Spinner component
    if (status === "LOADING") {
        // Alternative loading message (commented out)
        // return <p className='last-order text-2xl text-center text-green-500 py-6' >Loading...</p>
        return <Spinner />
    }

    // If data fetching is idle, display the last booking details or a no booking message
    if (status === "IDLE") {
        return (
            shows.shows.length === 0 ? (
                // Display message when there are no previous bookings
                <p className='last-order py-4 text-red-600 text-xs md:text-sm'>No Previous Booking</p>
            ) : (
                // Display last booking details
                <div className='last-order text-xs md:text-sm'>
                    <h2 className='text-xl'>Last Booking Details</h2>
                    
                    {/* Display booked seats */}
                    <div className='seats'>
                        <h3><b>Seats</b>:</h3>
                        <p><b>A1</b>: {lastBookingShow.A1}</p>
                        <p><b>A2</b>: {lastBookingShow.A2}</p>
                        <p><b>A3</b>: {lastBookingShow.A3}</p>
                        <p><b>A4</b>: {lastBookingShow.A4}</p>
                        <p><b>D1</b>: {lastBookingShow.D1}</p>
                        <p><b>D2</b>: {lastBookingShow.D2}</p>
                    </div>

                    {/* Display selected time slot */}
                    <div className='slot'>
                        <p><b>Slot</b>: {lastBookingShow.timeSlot}</p>
                    </div>

                    {/* Display movie name */}
                    <div className='movie'>
                        <p><b>Movie</b>: {lastBookingShow.movieName}</p>
                    </div>
                </div>
            )
        )
    }

    // Optional: Return null or a fallback UI if none of the above conditions are met
    return null
}

export default LastOrder
