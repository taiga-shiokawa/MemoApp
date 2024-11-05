import {
  Alert,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import CircleButton from "../../components/CircleButton";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { auth, db } from "../../config";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";
const handlePress = (id: string, bodyText: string): void => {
  if (auth.currentUser === null) { return }
  const ref = doc(db, `users/${auth.currentUser?.uid}/memos`, id);
  setDoc(ref, {
    bodyText,
    updatedAt: Timestamp.fromDate(new Date()),
  })
    .then(() => {
      console.log("edit success");
      router.back();
    })
    .catch((error) => {
      console.error(error);
      Alert.alert("メモの編集に失敗しました");
    });
};

const Edit = (): JSX.Element => {
  const id = String(useLocalSearchParams().id);
  const [bodyText, setBodyText] = useState("");
  useEffect(() => {
    if (auth.currentUser === null) {
      return;
    }
    const ref = doc(db, `users/${auth.currentUser?.uid}/memos`, id);
    getDoc(ref)
      .then((docRef) => {
        const RemoteBodyText = docRef.data()?.bodyText;
        setBodyText(RemoteBodyText);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(`Memo id: ${id}`);
  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* Edit contents */}
      <View style={styles.inputContainer}>
        <TextInput 
          multiline 
          style={styles.input} 
          value={bodyText} 
          onChangeText={(text) => {setBodyText(text)}}
          autoFocus
        />
      </View>

      {/* Edit finish button */}
      <CircleButton onPress={()  => {handlePress(id, bodyText)}}>
        <Feather name="check" size={40} />
      </CircleButton>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
});

export default Edit;
