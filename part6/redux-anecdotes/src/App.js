import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = ({store}) => (
  <div>
    <Notification store={store} />
    <h2>Anecdotes</h2>
    <Filter store={store}/>
    <AnecdoteList store={store} />
    <AnecdoteForm store={store} />
  </div>
)

export default App