import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { useContext } from 'react'
import ParentContext from './Usecontext/ParentContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ParentContext>
      <App /> 
    </ParentContext>
  </BrowserRouter>,
)
