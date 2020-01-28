import React from 'react';
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({createAnecdote, showNotification, removeNotification}) => {

  const addNote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdote(newAnecdote)
    
    showNotification(`"${newAnecdote}" was added`)
    setTimeout(() => {removeNotification()}, 5000)
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

const mapDispatchToProps = {
  createAnecdote,
  showNotification,
  removeNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)