import React from 'react'
import { connect } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { showNotification, removeNotification} from '../reducers/notificationReducer'

const AnecdoteList = ({anecdotes, filter, increaseVote, showNotification, removeNotification}) => {
  anecdotes.sort((a, b) => b.votes - a.votes)

  const anecdotesToShow = () => {
    return anecdotes.filter(anecdote => (
      anecdote.content
        .toLowerCase()
        .includes(filter)
    ))
  }

  const vote = (anecdote) => {
    increaseVote(anecdote.id)
    
    showNotification(`you voted for "${anecdote.content}"`)
    setTimeout(() => {removeNotification()}, 5000)
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

const mapStateToProps = (state) => ({
  anecdotes: state.anecdotes,
  filter: state.filter
})

const mapDispatchToProps = {
  increaseVote,
  showNotification,
  removeNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)