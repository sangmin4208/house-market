import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../firebase.config'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  useState(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      }
      setCheckingStatus(false)
    })

    return unsub
  }, [])
  return { loggedIn, checkingStatus }
}
