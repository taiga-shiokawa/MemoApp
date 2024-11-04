import { KeyboardAvoidingView, TextInput, View, StyleSheet } from "react-native"
import CircleButton from "../../components/CircleButton"
import { Feather } from "@expo/vector-icons"
import { router } from "expo-router"

const handlePress = (): void => {
  router.back();
}

const Create = ():JSX.Element =>{
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>

      {/* Edit contents */}
      <View style={styles.inputContainer}>
        <TextInput multiline style={styles.input} value=""/>
      </View>

      {/* Edit finish button */}
      <CircleButton onPress={handlePress}>
        <Feather name="check" size={40}/>
      </CircleButton>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  inputContainer: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24,
  }
})

export default Create