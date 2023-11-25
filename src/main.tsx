import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// This is, effectively, the "main" function of our app.
//
// If you've never used React before, this is a good place to start:
// https://reactjs.org/docs/getting-started.html
//
// But mostly, you don't really need to worry about this code; 
// it's just the boilerplate to get our app running.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
