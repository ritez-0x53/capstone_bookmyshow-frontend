// Import React for JSX syntax
import React from 'react'
// Import ReactDOM for rendering the React application to the DOM
import ReactDOM from 'react-dom/client'
// Import the main App component for rendering
import App from './App'
// Import global CSS styles for the application
import './index.css'
// Import Provider component from React-Redux to provide the Redux store to the app
import { Provider } from 'react-redux'
// Import the Redux store configuration from the app folder
import { store } from './app/store'

// Render the app into the root element in the HTML, and wrap it with the Redux Provider
// This allows all components in the app to access the Redux store
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
