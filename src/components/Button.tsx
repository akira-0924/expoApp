import { Text, StyleSheet, TouchableOpacity } from 'react-native'

interface Props {
  text: string
  onPress?: () => void
}

const Button = ({ text, onPress }: Props): React.JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonLabel}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5abd34',
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 24
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    color: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 24
  }
})

export default Button
