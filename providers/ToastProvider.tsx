
'use client'

import { Toaster } from "react-hot-toast"

import toastOptions from '@/config/toaster'

const ToastProvider = () => {
  
  return ( 
    <Toaster 
      toastOptions={toastOptions}
    />
  )
}
 
export default ToastProvider
