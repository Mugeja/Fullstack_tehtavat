import React, { useState } from 'react'
import ReactDOM from 'react-dom'


    const Statistics = (props) => {
        if (props.statistics[3].value === 0) {
            return(
            <div>
            Ei yhtään statistiikkaa annettu
            </div>
        )
    }
        return(
            <table>
            <tbody>
            <Stat name={props.statistics[0].name} value={props.statistics[0].value} />
            <Stat name={props.statistics[1].name} value={props.statistics[1].value} />
            <Stat name={props.statistics[2].name} value={props.statistics[2].value} />
            <Stat name={props.statistics[3].name} value={props.statistics[3].value} />
            <Stat name={props.statistics[4].name} value={props.statistics[4].value} />
            <Stat name={props.statistics[5].name} value={props.statistics[5].value} />
            </tbody>
            </table>
        )
}
    const Stat = (props) => {
        return(
            <tr>
                <td>{props.name}</td>
                <td>{props.value}</td>
                
            </tr>
        )
    }

    const Button = (props) => {
     return(
        <button onClick={() => props.function(props.quality + 1)}> 
        {props.tag} 
        </button>   
        )
    }

const App = (props) => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const statistics = [
      //0
      {
          name: "hyvä",
          value: good
      },
      //1
      {
          name: "neutraali",
          value: neutral
      },
      //2
      {
          name: "huono",
          value: bad
      },
      //3
      {
          name: "yhteensä",
          value: good + neutral + bad
      },
      //4
      {
          name: "keskiarvo",
          value: (good-bad)/(good+neutral+bad)
      },
      //5
      {
          name: "positiivisia",
          value: 100*good/(good+neutral+bad) + "%"
      }
  ]

  return (
    <div>
        
    <h1>Anna palautetta</h1>
    <Button  function={setGood} quality={good} tag="hyvä"/>
    <Button  function={setNeutral} quality={neutral} tag="neutraali"/>
    <Button  function={setBad} quality={bad} tag="huono" />
    <h1>Statistiikkaa</h1>
    <Statistics statistics={statistics} />

    </div>    
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)