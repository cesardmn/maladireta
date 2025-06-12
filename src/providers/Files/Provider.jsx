import { useState } from 'react'
import { FilesContext } from './Context'

export const FilesProvider = ({ children }) => {
  const [files, setFiles] = useState({})

  return (
    <FilesContext.Provider value={{ files, setFiles }}>
      {children}
    </FilesContext.Provider>
  )
}
