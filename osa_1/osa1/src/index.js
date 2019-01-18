import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
    <h1> {props.course.name} </h1>
    )
}

const Content = (props) => {
  const list = props.course.parts
    return(
        <div>
        <Part name={list[0].name} amount={list[0].exercises} />
        <Part name={list[1].name} amount={list[1].exercises} />
        <Part name={list[2].name} amount={list[2].exercises} />       
        </div>
    )
}

const Part = (props) => {
    return(
<p> {props.name} {props.exercises} </p>
    )
}
const Total = (props) => {
    return(
<p>yhteensä {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises} tehtävä </p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7
        },
        {
          name: 'Komponenttien tila',
          exercises: 14
        }
      ]
    }
  return (
    <div>
      <Header course={course} />
      
      <Content course={course} />
      
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))