import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Amplify } from 'aws-amplify'
import backend_config from './config.ts'

Amplify.configure({
  API: {
    REST: {
      Api: {
        endpoint: backend_config.apiGateway.URL, 
        region: backend_config.apiGateway.REGION
      }
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

