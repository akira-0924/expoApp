import { useEffect } from 'react'
import { Redirect, router } from 'expo-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config'
import { SplashScreen } from 'expo'

const Index = (): React.JSX.Element => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        router.replace('/memo/list')
      }
    })
  }, [])
  return <Redirect href='auth/login' />
}

export default Index
