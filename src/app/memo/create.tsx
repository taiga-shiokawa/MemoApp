import { TextInput, View, StyleSheet, Alert } from "react-native"
import CircleButton from "../../components/CircleButton"
import { Feather } from "@expo/vector-icons"
import { router } from "expo-router"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { auth, db } from "../../config"
import { useState } from "react"
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView"

// OpenAI APIの設定
const correctText = async (text: string): Promise<string> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: "あなたは文章校正の専門家です。ユーザーが入力した文章の誤字脱字を修正し、より自然な日本語に修正してください。ただし、元の文章の意味や意図は保持してください。修正した文章のみを返してください。"
          },
          {
            role: "user",
            content: text
          }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error correcting text:', error);
    throw error;
  }
};

const handlePress = async (bodyText: string): Promise<void> => {
  if (auth.currentUser === null) { return }
  
  try {
    // ローディング状態を表示することも検討してください
    const correctedText = await correctText(bodyText);
    
    // 修正前と修正後のテキストが異なる場合、ユーザーに確認
    if (correctedText !== bodyText) {
      Alert.alert(
        "テキストの修正提案",
        "以下の修正を適用しますか？\n\n修正前:\n" + bodyText + "\n\n修正後:\n" + correctedText,
        [
          {
            text: "キャンセル",
            style: "cancel"
          },
          {
            text: "適用",
            onPress: async () => {
              await saveToDatabase(correctedText);
            }
          }
        ]
      );
    } else {
      // 修正の必要がない場合は直接保存
      await saveToDatabase(bodyText);
    }
  } catch (error) {
    console.error('Error in handlePress:', error);
    Alert.alert(
      "エラー",
      "テキストの修正中にエラーが発生しました。\n修正なしで保存しますか？",
      [
        {
          text: "キャンセル",
          style: "cancel"
        },
        {
          text: "保存",
          onPress: async () => {
            await saveToDatabase(bodyText);
          }
        }
      ]
    );
  }
};

const saveToDatabase = async (text: string): Promise<void> => {
  if (auth.currentUser === null) { return }
  const ref = collection(db, `users/${auth.currentUser?.uid}/memos`);
  
  try {
    const docRef = await addDoc(ref, {
      bodyText: text,
      updatedAt: Timestamp.fromDate(new Date()),
    });
    console.log("success", docRef.id);
    router.back();
  } catch (error) {
    console.error("Error adding document: ", error);
    Alert.alert("保存エラー", "メモの保存中にエラーが発生しました。");
  }
};

const Create = (): JSX.Element => {
  const [bodyText, setBodyText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSavePress = async () => {
    setIsLoading(true);
    try {
      await handlePress(bodyText);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
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

      <CircleButton onPress={handleSavePress} disabled={isLoading}>
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
});

export default Create;