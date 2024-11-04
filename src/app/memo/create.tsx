import { TextInput, View, StyleSheet } from "react-native"
import CircleButton from "../../components/CircleButton"
import { Feather } from "@expo/vector-icons"
import { router } from "expo-router"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { auth, db } from "../../config"
import { useState } from "react"
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView"

const handlePress = (bodyText: string): void => {
  if (auth.currentUser === null) { return }
  const ref = collection(db, `users/${auth.currentUser?.uid}/memos`);
  // async awaitを使ってもいい
  addDoc(ref, {
    bodyText: bodyText,
    updatedAt: Timestamp.fromDate(new Date()), // firebaseではTimestampを使う
  })
  .then((docRef) => {
    console.log("success", docRef.id);
    router.back();
  })
  .catch((error) => {
    const { code, message } = error;
    console.log(code, message);
  })
}

const Create = ():JSX.Element =>{
  const [bodyText, setBodyText] = useState("");
  return (
    <KeyboardAvoidingView style={styles.container}>

      {/* Create contents */}
      <View style={styles.inputContainer}>
        <TextInput 
          multiline 
          style={styles.input} 
          value={bodyText}
          onChangeText={(text) => {setBodyText(text)}}
          autoCapitalize="none"
          autoFocus
        />
      </View>

      {/* Add button */}
      <CircleButton onPress={() => {handlePress(bodyText)}}>
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