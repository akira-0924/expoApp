import { Stack } from 'expo-router'

const Layout = (): React.JSX.Element => {
  return <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: '#5abd34'
      },
      headerTintColor: '#ffffff',
      headerTitle: 'Memo App',
      headerTitleStyle: {
        fontSize: 22,
        fontWeight: 'bold'
      },
      headerBackTitle: '戻る'
    }}
  />
}

export default Layout
