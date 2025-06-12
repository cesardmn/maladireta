import { useContext } from 'react'
import { FilesContext } from './Context'

export const useFiles = () => useContext(FilesContext)
