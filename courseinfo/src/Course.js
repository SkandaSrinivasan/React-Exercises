import React from 'react'

const Course = ({ course }) => {
    return (
      <div>
        <Header courseName={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
  
    )
  }
  const Header = (props) => {
    return (
      <>
        <h1>
          {props.courseName}
        </h1>
      </>
    )
  };
  
  const Content = ({ parts }) => {
    return (
      <>
        {parts.map(part => <Part key={part.id} partName={part.name} exerciseCount={part.exercises} />)}
      </>
    )
  }
  
  const Part = ({ partName, exerciseCount }) => {
    return (
      <>
        <p>{partName} {exerciseCount}</p>
      </>
    )
  }
  
  const Total = ({ parts }) => {
    return (
      <>
        <p>Total Number of Exercises {
          
          parts.reduce((sum, part) => {
            console.log(sum,part.exercises);
            return (sum+part.exercises)
          }, 0)}
        </p>
      </>
    )
  }

  export default Course