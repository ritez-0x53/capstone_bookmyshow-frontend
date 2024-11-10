import React, { useEffect, useState } from "react"; // Import React and hooks
import { movies, slots, seats } from "../data"; // Import static data
import { useDispatch } from "react-redux"; // Import useDispatch for Redux
import { bookShow, fetchBookedShows } from "../features/shows/showSlice"; // Import actions
import axios from "axios"; // Import Axios for HTTP requests
import { ToastContainer, toast } from 'react-toastify'; // Import Toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles


function BookForm({ setProcessing }) { // Booking form component
     const dispatch = useDispatch(); // Initialize dispatch
     const [seatType, setSeatType] = useState(''); // State for selected seat type
     const [movieName, setMovieName] = useState(""); // State for selected movie
     const [timeSlot, setTimeSlot] = useState(""); // State for selected time slot
     const [A1, setA1] = useState(0); // State for seat A1
     const [A2, setA2] = useState(0); // State for seat A2
     const [A3, setA3] = useState(0); // State for seat A3
     const [A4, setA4] = useState(0); // State for seat A4
     const [D1, setD1] = useState(0); // State for seat D1
     const [D2, setD2] = useState(0); // State for seat D2

     // Reset form fields
     function reset() {
          setMovieName("")
          setTimeSlot("")
          setA1(0)
          setA2(0)
          setA3(0)
          setA4(0)
          setD1(0)
          setD2(0)
          setSeatType("")
     }

     // Handle seat type change
     const handleSeatType = (setFunction, e) => {
          const number = Number.parseInt(e.target.value);
          setFunction(number);
     }

     // Handle form submission
     const handleSubmit = async (e) => {
          e.preventDefault();
          setProcessing(true)
          try {
               const finalBook = {
                    movieName,
                    timeSlot,
                    A1,
                    A2,
                    A3,
                    A4,
                    D1,
                    D2,
               };
               // Send booking data to API
               const res = await axios.post("https://bookmyshow-api-riteswar.onrender.com/api/booking", finalBook)
               if (res) {
                    dispatch(bookShow(finalBook)) // Dispatch booking action
                    reset(); // Reset form
                    const notify = () => toast.success(res.data.msg); // Success notification
                    setTimeout(() => {
                         notify();
                         setProcessing(false);
                    }, 1000)
               }
          } catch (error) {
               // Handle error (can add a comment here if needed)
          }
     };

     return (
          <>
               <form className="book-form text-xs md:text-sm" onSubmit={handleSubmit}>
                    {/* Movie selection */}
                    <div className=" movie-row">
                         <h2 className="text-lg md:text-xl" >Select Movie</h2>
                         {movies.map((movie, index) => {
                              return (
                                   <div onClick={() => { setMovieName(movie) }}
                                        key={index.toString()}
                                        className={`${movie === movieName ? "movie-column-selected" : null} p-4 inline-block mx-1 my-5 movie-column cursor-pointer`}  >
                                        <p>{movie}</p>
                                   </div>
                              );
                         })}
                    </div>

                    {/* Time slot selection */}
                    <div className="slot-row">
                         <h2 className="text-lg md:text-xl" >Select a Time slot</h2>
                         {slots.map((slot, index) => {
                              return (
                                   <div onClick={() => { setTimeSlot(slot) }}
                                        key={index.toString()}
                                        className={`${slot === timeSlot ? "slot-column-selected" : null} p-4 slot-column inline-block mx-1 my-5 cursor-pointer`}
                                   >
                                        <p>{slot}</p>
                                   </div>
                              );
                         })}
                    </div>

                    {/* Seat selection */}
                    <div className="select-seat border my-2 p-2">
                         <h2 className="text-lg md:text-xl" >Select the seats </h2>
                         {seats.map((seat, index) => {
                              return (
                                   <div
                                        key={index.toString()}
                                        onClick={() => {
                                             setSeatType(index);
                                        }}
                                        className={`cursor-pointer w-24 seat-row inline-block p-3 m-1 border text-center ${seatType === index ? "seat-column-selected" : null
                                             } `}
                                   >
                                        <label htmlFor={`seat-${seat}`} >Type {seat}</label>
                                        <br />
                                        <input
                                             className="px-1 my-2 w-4/5 mx-auto text-black bg-transparent border rounded-sm"
                                             value={eval(seat) <= 0 ? 0 : eval(seat)}
                                             id={`seat-${seat}`}
                                             type="number"
                                             onChange={(e) => {
                                                  handleSeatType(eval("set" + seat), e);
                                             }}
                                        />
                                   </div>
                              );
                         })}
                    </div>
                    {/* Book button */}
                    <div className="book-button mt-4">
                         <button disabled={movieName.length > 0 && timeSlot.length > 0 && (A1 > 0 || A2 > 0 || A3 > 0 || A4 > 0 || D1 > 0 || D2 > 0) ? false : true} type="submit">Book Now</button>
                    </div>
                    <ToastContainer /> {/* Container for toast notifications */}
               </form>
          </>
     );
}

export default BookForm; // Export the component
