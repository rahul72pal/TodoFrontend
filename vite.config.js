import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { json } from 'react-router-dom'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define:{
  //   'process.env.REACT_APP_BASE_URL': JSON.stringify(process.env.REACT_APP_BASE_URL)
  // }
})
