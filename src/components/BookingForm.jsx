import React, { useEffect, useState } from "react";
import { movies, slots, seats } from "../data";
import { useDispatch } from "react-redux";
import { bookShow, fetchBookedShows } from "../features/shows/showSlice";
import axios from "axios";

function BookForm() {

     // last booked show 
     const dispatch = useDispatch();
     const [seatType, setSeatType] = useState(null);
     const [movieName, setMovieName] = useState("");
     const [timeSlot, setTimeSlot] = useState("");
     const [A1, setA1] = useState(0);
     const [A2, setA2] = useState(0);
     const [A3, setA3] = useState(0);
     const [A4, setA4] = useState(0);
     const [D1, setD1] = useState(0);
     const [D2, setD2] = useState(0);
     const [valid, setValid] = useState(false);

     const resetAll = () => {
          movieName("")
          timeSlot("")
          setA1(0)
          setA2(0)
          setA3(0)
          setA4(0)
          setD1(0)
          setD2(0)
     }

     useEffect(() => {
          async function fetchData() {
               try {
                    const res = await axios.get("https://bookmyshow-api-riteswar.onrender.com/api/booking")
                    localStorage.setItem("bookedshows", JSON.stringify(res.data));
                    const data = JSON.parse(localStorage.getItem("bookedshows"));
                    dispatch(fetchBookedShows(res.data));
               } catch (err) {
                    console.log(err)
               }
          }
          fetchData();
     }, [])

     const handleChange = (setFunction, value) => {
          setFunction((state) => {
               return value;
          });
     };

     const handleSeatType = (setFunction, e) => {
          const number = Number.parseInt(e.target.value);
          setFunction((state) => {
               return number;
          });
     }

     const handleSubmit = async (e) => {
          e.preventDefault();
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
               const res = await axios.post("https://bookmyshow-api-riteswar.onrender.com/api/booking", finalBook)
               if (res) {
                    dispatch(bookShow(finalBook))
                    alert(res.data.msg)
                    resetAll();
               }
          } catch (error) {
               // console.log(error)
          }
     };

     return (
          <>
               <form className="book-form text-xs md:text-sm" onSubmit={handleSubmit}>
                    {/* <h1 className="ml-2 text-xl" >Book that show!!</h1> */}
                    <div className="select-movie border p-2">
                         {/* select movie container */}
                         <h2 className="text-lg md:text-xl" >Select Movie</h2>
                         {movies.map((movie, index) => {
                              return (
                                   <div
                                        key={index.toString()}
                                        className="inline-block mx-1 my-5 input-radio-group"
                                   >
                                        <input
                                             onChange={(e) => {
                                                  handleChange(setMovieName, e.target.value);
                                             }}
                                             type="radio"
                                             value={movie}
                                             id={movie}
                                             name="movie"
                                        />
                                        <label
                                             className="cursor-pointer border px-5 py-3"
                                             htmlFor={movie}
                                        >
                                             {movie}
                                        </label>
                                   </div>
                              );
                         })}
                    </div>

                    {/* select timeslot container */}
                    <div className="select-timeslot my-2 border p-2">
                         <h2 className="text-lg md:text-xl" >Select a Time slot</h2>
                         {slots.map((timeSlot, index) => {
                              return (
                                   <div
                                        key={index.toString()}
                                        className={`inline-block mx-1 my-5 input-radio-group`}
                                   >
                                        <input
                                             onChange={(e) => {
                                                  handleChange(setTimeSlot, e.target.value);
                                             }}
                                             type="radio"
                                             value={timeSlot}
                                             id={timeSlot}
                                             name="timeslot"
                                        />
                                        <label
                                             className="cursor-pointer border px-5 py-3"
                                             htmlFor={timeSlot}
                                        >
                                             {timeSlot}
                                        </label>
                                   </div>
                              );
                         })}
                    </div>

                    {/* select seat container */}
                    <div className="select-seat border my-2 p-2">
                         <h2 className="text-lg md:text-xl" >Select the seats </h2>
                         {seats.map((seat, index) => {
                              return (
                                   <div
                                        key={index.toString()}
                                        onClick={() => {
                                             setSeatType(index);
                                        }}
                                        className={`cursor-pointer w-24 seat-row inline-block p-3 m-1 border text-center ${seatType === index ? "seat-select" : null
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
                    <div className="book-button">
                         <button disabled={movieName.length > 0 && timeSlot.length > 0 && (A1 > 0 || A2 > 0 || A3 > 0 || A4 > 0 || D1 > 0 || D2 > 0) ? false : true} type="submit">Book Now</button>
                    </div>
               </form>
          </>
     );
}

export default BookForm;
