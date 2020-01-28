import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({store}) => {

  const addNote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    store.dispatch(createAnecdote(newAnecdote))
    
    store.dispatch(showNotification(`"${newAnecdote}" was added`))
    setTimeout(() => {store.dispatch(removeNotification())}, 5000)
  }

  return (
    <div>
    <h2>create new</h2>
      <form onSubmit={addNote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm