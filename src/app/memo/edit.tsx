import { View, TextInput, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { router, useLocalSearchParams } from 'expo-router'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { db, auth } from '../../config'
import { useState, useEffect } from 'react'
import { type Memo } from '../../types/type'

const handlePress = (id: string, bodyText: string): void => {
  if (auth.currentUser === null) {
    return
  }
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
  setDoc(ref, {
    bodyText,
    updatedAt: Timestamp.fromDate(new Date())
  })
    .then(() => {
      console.log('memoを更新しました')
      router.back()
    })
    .catch((error) => {
      Alert.alert('memoの更新に失敗しました')
      console.log(error)
    })
}

const Edit = (): JSX.Element => {
  const id = String(useLocalSearchParams().id)
  const [bodyText, setBodyText] = useState('')
  useEffect(() => {
    if (auth.currentUser === null) {
      return
    }
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
    getDoc(ref)
      .then((docRef) => {
        const { bodyText } = docRef.data() as Memo
        setBodyText(bodyText)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          value={bodyText}
          style={styles.input}
          autoFocus
          onChangeText={(text) => { setBodyText(text) }}
        />
      </View>
      <CircleButton onPress={() => { handlePress(id, bodyText) }}>
        <Icon name='check' size={30} color='#ffffff' />
      </CircleButton>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  inputContainer: {
    flex: 1
  },
  input: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24
  }
})

export default Edit
