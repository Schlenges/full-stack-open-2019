import React from 'react'
import { connect } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({visibleAnecdotes, increaseVote, showNotification}) => {
  
  const vote = (anecdote) => {
    increaseVote(anecdote)
    showNotification(`you voted for "${anecdote.content}"`, 3)
  }

  return (
    <div>
      {visibleAnecdotes.map(anecdote =>
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

const anecdotesToShow = ({anecdotes, filter}) => {
  anecdotes.sort((a, b) => b.votes - a.votes)

  return anecdotes.filter(anecdote => (
    anecdote.content
      .toLowerCase()
      .includes(filter)
  ))
}

const mapStateToProps = (state) => ({
  visibleAnecdotes: anecdotesToShow(state)
})

const mapDispatchToProps = {
  increaseVote,
  showNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)