import { useEffect, useState } from 'react'
import './App.css'
import BookForm from './components/BookingForm'
import LastOrder from './components/LastOrder'
import Spinner from './components/Spinner'

function App() {
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProcessing(false)
    }, 2000)
  }, [])

  return <div id='app' className='overflow-hidden' >
    <h1 className='text-2xl mb-3 font-bold' >Book that show!!</h1>
    <div className='wrapper' >
      <BookForm setProcessing={setProcessing} />
      <LastOrder />
      {
        processing ? <Spinner /> : null
      }
    </div>
  </div>

}

export default App
