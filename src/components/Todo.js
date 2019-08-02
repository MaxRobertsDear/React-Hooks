/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const todo = props => {
  const [todoName, setTodoName] = useState('')
  const [todoList, setTodoList] = useState([])

  const inputChangeHandler = (event) => {
    setTodoName(event.target.value)
  }

  useEffect(() => {
    document.addEventListener('mousemove', () => {
      console.log(event.clientX, event.clientY)
    })
  })

  useEffect(() => {
    axios.get('https://react-hooks-practice-7ab69.firebaseio.com/.json').then(result => {
      console.log(result)
      const todoData = result.data
      const todos = []
      for (const key in todoData) {
        todos.push({id: key, name: todoData[key].name})
      }
      setTodoList(todos)
    })
    return () => {
      console.log('Cleanup')
    }
  }, [todoName])
  
  const todoAddHandler = () => {
    setTodoList(todoList.concat(todoName))
    axios.post('https://react-hooks-practice-7ab69.firebaseio.com/.json', {name: todoName})
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
      placeholder="todo"
      onChange={inputChangeHandler}
      value={todoName} />
    <button type="button" onClick={todoAddHandler}>
      Add
    </button>
    <ul>
      {todoList.map(todo => (
        <li key={todo.id}>{todo.name}</li>
      ))}
    </ul>
  </React.Fragment>
}

export default todo