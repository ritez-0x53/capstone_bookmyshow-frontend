import { useEffect, useState } from 'react'
import './App.css'
import BookForm from './components/BookingForm'
import LastOrder from './components/LastOrder'
import Spinner from './components/Spinner'

function App() {
  // State to manage the loading process
  const [processing, setProcessing] = useState(true);

  // useEffect to simulate a loading delay of 2 seconds
  useEffect(() => {
    setTimeout(() => {
      setProcessing(false) // Update processing state after timeout
    }, 2000)
  }, [])

  return (
    <div id='app' className='overflow-hidden'>
      <h1 className='text-2xl mb-3 font-bold'>Book that show!!</h1>
      <div className='wrapper'>
        {/* Booking form component with setProcessing prop to control loading state */}
        <BookForm setProcessing={setProcessing} />
       
        {/* Component to display the last booking order */}
        <LastOrder />
        
        {
          // Conditionally render Spinner component while processing is true
          processing ? <Spinner /> : null
        }
      </div>
    </div>
  )
}

export default App
