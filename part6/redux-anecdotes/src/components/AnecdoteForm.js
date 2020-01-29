import React from 'react';
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, removeNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = ({createAnecdote, handleNotification}) => {

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote = await anecdotesService.createNew(content)
    createAnecdote(newAnecdote)
    handleNotification(content)
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

const mapDispatchToProps = (dispatch) => ({
  createAnecdote: (anecdote) => dispatch(createAnecdote(anecdote)),
  handleNotification: (newAnecdote) => {
    dispatch(showNotification(`"${newAnecdote}" was added`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }
})

export default connect(null, mapDispatchToProps)(AnecdoteForm)