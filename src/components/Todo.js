/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useReducer, useRef } from 'react'
import axios from 'axios'

import List from './List'

const todo = props => {
  const [inputIsValid, setInputIsValid] = useState(false)
  // const [todoName, setTodoName] = useState('')
  // const [todoList, setTodoList] = useState([])
  // const [submittedTodo, setSubmittedTodo] = useState(null)

  const todoInputRef = useRef()

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload)
      case 'SET':
        return action.payload
      case 'REMOVE':
        return state.filter((todo) => todo.id !== action.payload)
      default:
        return state
    }
  }

  const [todoList, dispatch] = useReducer(todoListReducer, [])
  
  // const inputChangeHandler = (event) => {
  //   setTodoName(event.target.value)
  // }

  const mouseMoveHandler = event => {
    console.log(event.clientX, event.clientY)
  }

  const inputValidationHandler = (event) => {
    if (event.target.value === ''){
      setInputIsValid(false)
    } else {
      setInputIsValid(true)
    }
  }

  // useEffect(() => {
  //   if (submittedTodo) {
  //     dispatch({type: 'ADD', payload: submittedTodo})
  //   }
  // }, [submittedTodo]
  // )

  useEffect(() => {
    document.addEventListener('mousemove', mouseMoveHandler)
    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler)
    }
  }, [])



  useEffect(() => {
    axios.get('https://react-hooks-practice-7ab69.firebaseio.com/.json').then(result => {
      // console.log(result)
      const todoData = result.data
      const todos = []
      for (const key in todoData) {
        todos.push({id: key, name: todoData[key].name})
      }
      dispatch({type: 'SET', payload: todos})
    })
    return () => {
      console.log('Cleanup')
    }
  }, [])
  
  const todoAddHandler = () => {
    const todoName = todoInputRef.current.value
    axios
      .post('https://react-hooks-practice-7ab69.firebaseio.com/.json', {name: todoName})
      .then(res => {
        const todoItem = {id: res.data.name, name: todoName}
        dispatch({type: 'ADD', payload: todoItem})
        })
      .catch(err => {
        console.log(err)
      })
  }

  const todoRemoveHandler = (todoID) => {
    axios
      .delete(`https://react-hooks-practice-7ab69.firebaseio.com/${todoID}.json`)
      .then(res => 
        dispatch({type: 'REMOVE', payload: todoID})
        )
      .catch(err => {
        console.log(err)
      })
  }

  return <React.Fragment>
    <input 
      type="text" 
      placeholder="todo"
      ref={todoInputRef}
      onChange={inputValidationHandler}
      style={{backgroundColor: !inputIsValid ? 'red' : 'transparent'}} />
    <button type="button" onClick={todoAddHandler}>
      Add
    </button>
    <List items={todoList} onClick={todoRemoveHandler} />
  </React.Fragment>
}

export default todo