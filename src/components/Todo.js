/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'

const todo = props => {
  const [toDoName, setToDoName] = useState('')

  const inputChangeHandler = (event) => {
    setToDoName(event.target.value)
  }

  return <React.Fragment>
    <input 
      type="text" 
      placeholder="Todo"
      onChange={inputChangeHandler}
      value={toDoName} />
    <button type="button">Add</button>
    <ul />
  </React.Fragment>
}

export default todo