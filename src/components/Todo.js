/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'

const todo = props => {
  const [toDoName, setToDoName] = useState('')
  const [toDoList, setToDoList] = useState([])

  const inputChangeHandler = (event) => {
    setToDoName(event.target.value)
  }

  const toDoAddHandler = () => {
    setToDoList(toDoList.concat(toDoName))
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