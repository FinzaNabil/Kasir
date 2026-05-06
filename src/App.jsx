import { useState } from 'react'
import { BrowserRouter } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-screen bg-gray-100 flex justify-center'>
      <div className='w-full max-w-100 bg-gray-50 min-h-screen relative shadow-2xl border-gray-500 border'>

      </div>
    </div>
  )
}

export default App
