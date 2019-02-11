import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import personService from './services/persons'
import './index.css'
import { log } from 'util';

const Rows = ({ persons, filter, setServiceMessage, serviceMessage }) => {
    return (
        persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) === true).map(person =>
            <li key={person.id}> {person.name} {person.number} <button onClick={() => deletePerson({ person, setServiceMessage, serviceMessage })} > poista </button> </li>)
    )
}

const deletePerson = ({ person, setServiceMessage, serviceMessage }) => {
    if (window.confirm(`poistetaanko ${person.name}?`)) {
        personService.deletePerson(person.id)

        setServiceMessage(`Poistettiin ${person.name}`)
        Notification({ serviceMessage })
        setTimeout(() => {
            setServiceMessage(null)
        }, 5000)
    }
}

const PersonForm = (props) => {
    return (
        <form onSubmit={props.addName}>
            <div>
                nimi: <input value={props.newName}
                    onChange={props.handleNameChange}
                />
            </div>
            <div>
                numero: <input value={props.newNumber}
                    onChange={props.handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )

}
const Filter = ({ filter, handleFilterChange }) => {
    return (
        <input
            value={filter}
            onChange={handleFilterChange}
        />
    )
}

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="notification">
            {message}
        </div>
    )

}


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, SetFilter] = useState('')
    const [serviceMessage, setServiceMessage] = useState()

    const updatePerson = ({ nameObject }) => {
        var id = null
        persons.forEach(person => {
            if (nameObject.name.toLowerCase() === person.name.toLowerCase()) {
                id = person.id
            }
        })
        personService.update(id, nameObject)
            .then(returnedPerson => {
                setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            })
        setServiceMessage(`Päivitettiin ${nameObject.name}`)
        Notification({ serviceMessage })
        setTimeout(() => {
            setServiceMessage(null)
        }, 5000)
    }

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
        SetFilter(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            number: newNumber,
        }

        if ((persons.map(person => person.name.toLowerCase())).includes(newName.toLowerCase())) {
            if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
                updatePerson({ nameObject })
            }
        }
        else {
            personService
                .create(nameObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    setServiceMessage(error.response.data)
                    Notification({serviceMessage})
                    console.log(error.response.data)
                })
            setServiceMessage(`Lisättiin ${nameObject.name}`)
            Notification({ serviceMessage })
            setTimeout(() => {
                setServiceMessage(null)
            }, 5000)
        }
    }

    return (
        <div>

            <h1>Puhelinluettelo</h1>
            <Notification message={serviceMessage} />
            <p>rajaa hakua</p>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h2>Lisää uusi</h2>
            <PersonForm addName={addName} newName={newName} newNumber={newNumber}
                handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
            <h2>Numerot</h2>
            <Rows persons={persons} filter={filter} setServiceMessage={setServiceMessage} serviceMessage={serviceMessage} />

        </div>
    )

}

ReactDOM.render(<App />,
    document.getElementById('root')
)
export default App