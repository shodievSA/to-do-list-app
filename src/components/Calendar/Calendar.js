import React, { useState } from 'react'

function Calendar() {
  const [count, setCount] = useState(0);

  return (
    <>
    <h1>{count}</h1>
    <button onClick={() => {
      setCount(count + 1);
      setCount(count + 1);
      setCount(count + 1);
    }}>click me</button>
    <button>Hello</button>
    </>
  )
}

export default Calendar;