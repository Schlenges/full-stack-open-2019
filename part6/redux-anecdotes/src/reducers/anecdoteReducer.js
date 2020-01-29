import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type){
    case 'VOTE':
      return state.map(anecdote => anecdote.id === action.data 
        ? {...anecdote, votes: anecdote.votes + 1 }
        : anecdote)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT':
      return action.data
    default:
      return state
  }

}

export const increaseVote = (id) => ({
  type: 'VOTE',
  data: id
})

export const createAnecdote = (content) => (
  async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
)

export const initAnecdotes = () => (
  async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
)

export default reducer