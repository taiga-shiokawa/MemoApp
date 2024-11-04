import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native"
import { auth } from "../config"
import { signOut } from "@firebase/auth"
import { router } from "expo-router";

const handlePress = (): void => {
  signOut(auth)
    .then(() => {
      router.replace("/auth/log_in");
    })
    .catch((error) => {
      const { code, message } = error;
      console.log(code, message);
      Alert.alert(message);
    });
}

const LogOutButton = (): JSX.Element => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.text}>ログアウト</Text>
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