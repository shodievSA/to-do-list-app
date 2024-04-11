import React from 'react'
import { useState } from 'react';

function SignOut() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
      }}>click me</button>
    </div>
  )
}

export default SignOut;