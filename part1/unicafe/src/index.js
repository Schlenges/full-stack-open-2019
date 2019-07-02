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
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const average = (good - bad) / all
  const positive = good * 100 / all

  const handleClick = (setValue, value) => {
    setValue(value + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => handleClick(setGood, good)}/>
      <Button text="neutral" onClick={() => handleClick(setNeutral, neutral)}/>
      <Button text="bad" onClick={() => handleClick(setBad, bad)}/>

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

ReactDOM.render(<App />, document.getElementById('root'))