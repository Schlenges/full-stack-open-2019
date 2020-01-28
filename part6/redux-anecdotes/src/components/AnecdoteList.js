import React from 'react'
import { increaseVote } from '../reducers/anecdoteReducer'
import { showNotification, removeNotification} from '../reducers/notificationReducer'

const AnecdoteList = ({store}) => {
  const anecdotes = store
    .getState().anecdotes
    .sort((a, b) => b.votes - a.votes)

  const anecdotesToShow = () => {
    const filterTerm = store.getState().filter
    return anecdotes.filter(anecdote => (
      anecdote.content
        .toLowerCase()
        .includes(filterTerm)
    ))
  }

  const vote = (anecdote) => {
    store.dispatch(increaseVote(anecdote.id))
    
    store.dispatch(showNotification(`you voted for "${anecdote.content}"`))
    setTimeout(() => {store.dispatch(removeNotification())}, 5000)
  }

  return (
    <div>
      {anecdotesToShow().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList