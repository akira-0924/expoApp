import { View, Text, StyleSheet } from 'react-native'

const Header = (): React.JSX.Element => {
  return (
    <View style={styles.header}>
      <View style={styles.headerInner}>
        <Text style={styles.headerTitle}>Sample App</Text>
        <Text style={styles.headerRight}>ログアウト</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#5abd34',
    height: 64,
    justifyContent: 'flex-end'
  },
  headerInner: {
    alignItems: 'center'
  },
  headerRight: {
    position: 'absolute',
    right: 16,
    bottom: 20,
    color: '#ffffff',
    opacity: 0.7
  },
  headerTitle: {
    marginBottom: 16,
    fontSize: 22,
    lineHeight: 32,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})

export default Header
