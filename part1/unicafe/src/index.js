import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Statistics = (props) => {
  if(props.all > 0){
    return(
      <table>
        <tbody>
          <Statistic text="good" value={props.good} />
          <Statistic text="neutral" value={props.neutral} />
          <Statistic text="bad" value={props.bad} />
          <Statistic text="all" value={props.all} />
          <Statistic text="average" value={props.average} />
          <Statistic text="positive" value={`${props.positive} %`} />
        </tbody>
      </table>
    )
  }

  return <p>No feedback given</p>
}

const Statistic = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good * 1 + bad * -1) / all
  const positive = good * 100 / all

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good+1)}/>
      <Button text="neutral" onClick={() => setNeutral(neutral+1)}/>
      <Button text="bad" onClick={() => setBad(bad+1)}/>

      <h1>statistics</h1>
      <Statistics good={good}
                  neutral={neutral}
                  bad={bad}
                  all={all}
                  average={average}
                  positive={positive} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)