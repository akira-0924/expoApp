import { Text, StyleSheet, TouchableOpacity, type ViewStyle } from 'react-native'

interface Props {
  children: JSX.Element
  style?: ViewStyle
  onPress?: () => void
}

const CircleButton = ({ children, style, onPress }: Props): React.JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.circlesButton, style]}>
      <Text style={styles.circlesButtonLabel}>{ children }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  circlesButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#5abd34',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    right: 40,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8
  },
  circlesButtonLabel: {
    color: '#ffffff',
    fontSize: 40,
    lineHeight: 48
  }
})

export default CircleButton
