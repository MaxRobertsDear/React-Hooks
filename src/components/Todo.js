/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import axios from 'axios'
const todo = props => {
  const [toDoName, setToDoName] = useState('')
  const [toDoList, setToDoList] = useState([])

  const inputChangeHandler = (event) => {
    setToDoName(event.target.value)
  }

  const toDoAddHandler = () => {
    setToDoList(toDoList.concat(toDoName))
    axios.post('https://react-hooks-practice-7ab69.firebaseio.com/.json', {name: toDoName})
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return <React.Fragment>
    <input 
      type="text" 
      placeholder="Todo"
      onChange={inputChangeHandler}
      value={toDoName} />
    <button type="button" onClick={toDoAddHandler}>
      Add
    </button>
    <ul>
      {toDoList.map(todo => (
        <li key={todo}>{todo}</li>
      ))}
    </ul>
  </React.Fragment>
}

export default todo