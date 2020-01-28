const notificationReducer = (state = null, action) => {
  switch (action.type){
    case 'SHOW':
      return action.message
    case 'REMOVE':
      return null
    default: return state
  }
}

export const showNotification = (message) => ({
  type: 'SHOW',
  message
})

export const removeNotification = () => ({
  type: 'REMOVE'
})

export default notificationReducer