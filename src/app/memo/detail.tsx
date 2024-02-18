import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { router, useLocalSearchParams } from 'expo-router'
import { onSnapshot, doc } from 'firebase/firestore'
import { db, auth } from '../../config'
import { useState, useEffect } from 'react'
import { type Memo } from '../../types/type'

const handlePress = (id: string): void => {
  router.push({ pathname: '/memo/edit', params: { id } })
}

const Detail = (): React.JSX.Element => {
  const id = String(useLocalSearchParams().id)
  const [memo, setMemo] = useState<Memo | null>(null)

  useEffect(() => {
    if (auth.currentUser === null) {
      return
    }
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
    const unSubscribe = onSnapshot(ref, (memoDoc) => {
      const { bodyText, updatedAt } = memoDoc.data() as Memo
      setMemo({
        id: memoDoc.id,
        bodyText,
        updatedAt
      })
    })
    return unSubscribe
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>{ memo?.bodyText}</Text>
        <Text style={styles.memoData}>{ memo?.updatedAt.toDate().toLocaleString('ja-JP')}</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoBodyText}>
          { memo?.bodyText}
        </Text>
      </ScrollView>
      <CircleButton style={{ top: 60, bottom: 'auto' }} onPress={() => { handlePress(id) }}>
        <Icon name="pencil" size={40} color="#ffffff" />
      </CircleButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  memoHeader: {
    backgroundColor: '#5abd34',
    height: 96,
    justifyContent: 'flex-end',
    paddingVertical: 24,
    paddingHorizontal: 20
  },
  memoTitle: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold'
  },
  memoData: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 16
  },
  memoBody: {
    paddingHorizontal: 24
  },
  memoBodyText: {
    paddingVertical: 32,
    fontSize: 16,
    lineHeight: 24,
    color: '#000000'
  }
})

export default Detail
