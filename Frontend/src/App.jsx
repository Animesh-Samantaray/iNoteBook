import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        
      </div>
      <h1>Counter</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}  className=' mt-[20px] p-2 bg-amber-700 hover:bg-purple-900 text-white'>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
