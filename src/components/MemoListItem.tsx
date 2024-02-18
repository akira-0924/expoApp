import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import Icon from '../components/Icon'
import { Link } from 'expo-router'
import { type Memo } from '../types/type'
import { deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '../config'

interface Props {
  memo: Memo
}

const handlePress = (id: string): void => {
  if (auth.currentUser === null) {
    return
  }
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
  Alert.alert('メモを削除します', '本当によろしいですか？', [
    {
      text: 'キャンセル'
    },
    {
      text: '削除する',
      style: 'destructive',
      onPress: () => {
        deleteDoc(ref)
          .catch(() => {
            Alert.alert('削除に失敗しました')
          })
      }
    }
  ])
  // deleteDoc
}

const MemoListItem = ({ memo }: Props): React.JSX.Element | null => {
  let dataString: string = ''
  const { bodyText, updatedAt, id } = memo
  if (bodyText === null || updatedAt === null) { return null }
  dataString = updatedAt.toDate().toLocaleDateString('ja-JP')
  return (
    <Link
      href={{ pathname: '/memo/detail', params: { id } }}
      asChild
    >
      <TouchableOpacity style={styles.memoListItem}>
        <View>
          <Text numberOfLines={1} style={styles.memoListItemTitle}>{bodyText}</Text>
          <Text style={styles.memoListItemDate}>{dataString}</Text>
        </View>
        <TouchableOpacity onPress={() => { handlePress(memo.id) }}>
          <Icon name="delete" size={30} color="#B4b4b4" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  )
}

const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)'
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484'
  }
})

export default MemoListItem
