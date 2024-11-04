import { StyleSheet, Text, TouchableOpacity } from "react-native"

const LogOutButton = (): JSX.Element => {
  return (
    <TouchableOpacity>
      <Text style={styles.text}>LogOut</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    lineHeight: 16,
    color: "rgba(255, 255, 255, 0.7)",
  }
})

export default LogOutButton;