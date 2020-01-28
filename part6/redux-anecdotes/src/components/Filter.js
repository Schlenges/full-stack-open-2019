import React from 'react'
import { setFilter } from '../reducers/filterReducer'

const Filter = ({store}) => {
  console.log(store.getState().filter)
  const style = {
    marginBottom: 10
  }

  const handleChange = (event) => {
    store.dispatch(setFilter(event.target.value))
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter