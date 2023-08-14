import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Router from './router'
import { ContextProvider } from './contexts/ContextProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <ContextProvider>
      <Toaster
         toastOptions={{
          duration: 3000,
         }}
      />
      <RouterProvider router={Router} />
    </ContextProvider>
  // </React.StrictMode>,
)
