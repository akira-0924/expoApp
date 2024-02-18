import { View, StyleSheet, FlatList } from 'react-native'
import MemoListItem from '../../components/MemoListItem'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { router, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import LogoutButton from '../../components/LogoutButton'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db, auth } from '../../config'
import { type Memo } from '../../types/type'

const handlePress = (): void => {
  // 会員登録
  router.push('/memo/create')
}

const List = (): React.JSX.Element => {
  const navigation = useNavigation()

  const [list, setList] = useState<Memo[]>([])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => { return <LogoutButton /> }
    })
  }, [])

  useEffect(() => {
    if (auth.currentUser === null) {
      return
    }
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`)
    const q = query(ref, orderBy('updatedAt', 'desc'))
    const unSubscribe = onSnapshot(q, (snapShot) => {
      const remoteList: Memo[] = []
      snapShot.forEach((doc) => {
        const { bodyText, updatedAt } = doc.data()
        remoteList.push({
          id: doc.id,
          bodyText,
          updatedAt
        })
      })
      setList(remoteList)
    })
    return unSubscribe
  }, [])
  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={({ item }) => <MemoListItem memo={item} />}
      />
      <View>
      </View>
      <CircleButton onPress={handlePress}>
        <Icon name='plus' size={30} color='#ffffff' />
      </CircleButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
})

export default List
