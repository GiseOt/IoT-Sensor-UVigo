import React from 'react';
import { SensorProvider } from './contexts/SensorContext';
import { SensorTable } from './components/SensorTable';
import './App.css'

function App() {
 
  return (
    <>
    <SensorProvider>
      <SensorTable />
      </SensorProvider>
    </>
  )
}

export default App
