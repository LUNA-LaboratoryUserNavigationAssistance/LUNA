import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ErrorBoundary } from './ErrorBoundary.tsx'

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error("Could not find #root element to mount the app into.")
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
