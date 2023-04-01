import './App.css'
import BookForm from './components/BookingForm'
import LastOrder from './components/LastOrder'

function App() {
  return <div id='app' >
    <h1 className='text-2xl mb-3' >Book that show!!</h1>
    <div className='wrapper' >
      {/* <h1>Book that show!!</h1> */}
      <BookForm />
      <LastOrder />
    </div>
  </div>

}

export default App
