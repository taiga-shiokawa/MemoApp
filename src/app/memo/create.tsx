import { KeyboardAvoidingView, TextInput, View, StyleSheet } from "react-native"
import Header from "../../components/Header"
import CircleButton from "../../components/CircleButton"
import { Feather } from "@expo/vector-icons"

const Create = ():JSX.Element =>{
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>

      {/* Common header */}
      <Header />

      {/* Edit contents */}
      <View style={styles.inputContainer}>
        <TextInput multiline style={styles.input} value=""/>
      </View>

      {/* Edit finish button */}
      <CircleButton>
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