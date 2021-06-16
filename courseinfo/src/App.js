import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header courseName={course} />
      <Content partName1={parts[0].name} partName2={parts[1].name} partName3={parts[2].name} exerciseCount1={parts[0].exercises} exerciseCount2={parts[1].exercises}
        exerciseCount3={parts[2].exercises} />
      <Total exerciseCountTotal = {parts[0].exercises+parts[1].exercises+parts[2].exercises} />
    </div>
  )
};

const Header = (props) => {
  return (
    <>
      <h1>
        {props.courseName}
      </h1>
    </>
  )
};

const Content = (props) => {
  return (
    <>
      <Part partName = {props.partName1} exerciseCount = {props.exerciseCount1}/>
      <Part partName = {props.partName2} exerciseCount = {props.exerciseCount2}/>
      <Part partName = {props.partName3} exerciseCount = {props.exerciseCount3}/>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.partName} {props.exerciseCount}</p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Total Number of Exercises {props.exerciseCountTotal}</p>
    </>
  )
}

export default App