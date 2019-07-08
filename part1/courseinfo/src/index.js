import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => (
  <h1>{course}</h1>
)

const Part = (props) => (
  <p>{props.part.name} {props.part.exercises}</p>
)

const Content = ({parts}) => (
    <div>
      {/* {props.parts.map(part => (
        <Part name={part.name} exercises={part.exercises} />
      ))} */}
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  )

const Total = ({parts}) => {
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises

  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))