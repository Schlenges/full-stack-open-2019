import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

/* const Display = ({props}) => {
  return(
    <div>
    {props.map(prop => (
      <p>{prop}</p>
    ))}
    </div>
  )
} */

const Statistics = ({good, neutral, bad}) => {
  return(
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good+1)}/>
      <Button text="neutral" onClick={() => setNeutral(neutral+1)}/>
      <Button text="bad" onClick={() => setBad(bad+1)}/>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)