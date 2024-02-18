import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from '../components/Icon'
import { Link } from 'expo-router'
import { type Memo } from '../types/type'

interface Props {
  memo: Memo
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
        <TouchableOpacity>
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
