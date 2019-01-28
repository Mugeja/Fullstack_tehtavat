import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))
  var random = anecdotes[Math.floor(Math.random() * anecdotes.length)]

  const addPoint = () => {
    points[selected] += 1
    setPoints(points)
  }

  return (

    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} 
      <p>has {points[selected]} points</p>
      <Button random={random} setSelected={setSelected} points={points} />
      <VoteButton addPoint={addPoint} />
      <h1>Anecdote with most votes</h1>
      <MostVoted points={points} />
    </div>
  )
}

const Button = (props) => {

  return (
    <div>
      <button onClick={() => props.setSelected([Math.floor(Math.random() * anecdotes.length)])}>
        next anectode
    </button>
    </div>
  )
}


const MostVoted = ({ points }) => {
  var max = 0
  var index = 0
  for (var i = 0; i < points.length; i++) {
    if (points[i] > max) {
      max = points[i]
      index = i
    }
  }
  console.log(points);
  return (
    
    <div>{anecdotes[index]}
      <p>has {points[index]} votes</p>
    </div>

  )
}

const VoteButton = ({ addPoint }) => {
  return (
    <div>
      <button onClick={addPoint}>
        vote
    </button>
    </div>
  )
}
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)