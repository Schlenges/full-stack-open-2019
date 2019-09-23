import React from 'react'

const Course = ({course}) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const Header = ({course}) =>
  <h1>{course}</h1>
  
const Content = ({parts}) => parts.map(part => 
  <Part key={part.id} part={part} />
)

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p className="bold">total of {total} exercises</p>
}


export default Course