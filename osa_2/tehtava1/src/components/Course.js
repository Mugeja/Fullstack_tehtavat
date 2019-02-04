import React from 'react'
const Header = ({name}) => {
  
    return (
    <h1> {name} </h1>
    )
    
}

const Content = (props) => {
    return(
        <div>
        {props.parts.map((content) => <li key={content.id}>{content.name} {content.exercises} </li>)}
        </div>
    )
}

const Courses = ({courses}) => {

  return(
  <div>
  {courses.map((course) => <Course key={course.id} course={course}/>)}
  </div>
  )  
}

const Course = ({course}) => {
  console.log(course);
  
  return(
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

const Total = ({parts}) => {
  var helper = parts.map((part) => part.exercises)
  var sum = helper.reduce((sum, exercises) =>  sum + exercises, 0)
    return(
<p>yhteensä {sum} tehtävä </p>
    )
}
export default Courses