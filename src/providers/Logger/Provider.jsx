import { useReducer } from 'react'
import { LoggerContext } from './Context'

export const LoggerProvider = ({ children }) => {
  const loggerReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_LOG':
        return [...state, action.payload]
      case 'CLEAR_LOGS':
        return []
      default:
        return state
    }
  }

  const [logs, dispatch] = useReducer(loggerReducer, [])

  const log = (status, message) => {
    const normalizedStatus = (status || 'info').toString().toLowerCase()

    const logEntry = {
      status: normalizedStatus,
      message,
      timestamp: new Date().toLocaleTimeString(),
    }

    dispatch({ type: 'ADD_LOG', payload: logEntry })
  }

  const clearLogs = () => {
    dispatch({ type: 'CLEAR_LOGS' })
  }

  return (
    <LoggerContext.Provider value={{ logs, log, clearLogs }}>
      {children}
    </LoggerContext.Provider>
  )
}
