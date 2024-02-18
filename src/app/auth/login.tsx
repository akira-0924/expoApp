import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native'
import Button from '../../components/Button'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { auth } from '../../config'
import { signInWithEmailAndPassword } from 'firebase/auth'

const handlePress = (email: string, password: string): void => {
  // ログイン
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential)
      router.replace('/memo/list')
    })
    .catch((error) => {
      const { code, message } = error
      console.log(code)
      Alert.alert(message)
    })
}

const Login = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Log in</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => { setEmail(text) }}
          autoCapitalize='none'
          keyboardType='email-address'
          placeholder='メールアドレス'
          textContentType='emailAddress'
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => { setPassword(text) }}
          autoCapitalize='none'
          secureTextEntry
          placeholder='パスワード'
          textContentType='password'
        />
        <Button text="Submit" onPress={() => { handlePress(email, password) }} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not registered?</Text>
          <Link href="/auth/signup" asChild replace>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Sign up here!</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2ffef'
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dddddd',
    height: 48,
    padding: 8,
    fontSize: 16,
    marginBottom: 16
  },
  footer: {
    flexDirection: 'row'
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
    color: '#000000'
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#5abd34'
  }
})

export default Login
