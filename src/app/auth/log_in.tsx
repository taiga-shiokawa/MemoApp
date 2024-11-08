import { Alert, StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import { router } from "expo-router";
import { signInAnonymously } from "@firebase/auth";
import { auth } from "../../config";

// SplashScreen.preventAutoHideAsync();

// 通常ログイン
// const handlePress =(email: string, password: string): void => {
//   // ログイン処理
//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       console.log(userCredential.user.uid);
//       router.replace("/memo/list");
//     })
//     .catch((error) => {
//       const { code, message } = error;
//       console.log(code, message);
//       Alert.alert(message);
//     })
// }

// 匿名ログイン

const handleAnonymousLogin = async (): Promise<void> => {
  try {
    const userCredential = await signInAnonymously(auth);
    console.log("Anonymous login successful:", userCredential.user.uid);
    router.replace("/memo/list");
  } catch (error) {
    console.error("Anonymous login error:", error);
    Alert.alert("エラー", "ログインに失敗しました。もう一度お試しください。");
  }
};

// 通常ログイン
// const LogIn = (): JSX.Element => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <View style={styles.container}>

//       {/* Title */}
//       <View style={styles.inner}>
//         <Text style={styles.title}>LogIn</Text>
//         {/* Input */}
//         <TextInput 
//           style={styles.input} 
//           value={email}
//           onChangeText={(text) => {setEmail(text)}}
//           autoCapitalize="none"
//           keyboardType="email-address"
//           placeholder="Email address"
//           textContentType="emailAddress"
//         />
//         <TextInput 
//           style={styles.input} 
//           value={password} 
//           onChangeText={(text) => {setPassword(text)}}
//           autoCapitalize="none"
//           secureTextEntry
//           placeholder="Password"
//           textContentType="password"
//         />
//         {/* 送信ボタン */}
//         <Button label="submit" onPress={() => {handlePress(email, password)}}/>

//         {/* アサインアップページへ遷移 */}
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>Not registered?</Text>
//           <TouchableOpacity onPress={goToSignUp}>
//             <Text style={styles.footerLink}>Sign up here!</Text>
//           </TouchableOpacity>
//         </View>

//       </View>
//     </View>
//   );
// };

// 匿名ログイン
const LogIn = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title} >ゴジオケへようこそ </Text>
        <View>
          <Button 
            label="タップしてはじめる" 
            onPress={handleAnonymousLogin}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    // 中央寄せのために追加
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "-10%",
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27,
    // 必要に応じて幅を設定
    width: '100%',
    // 中央寄せのために追加
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    marginBottom: 24,
    // テキストを中央寄せにする場合
    textAlign: 'center',
    fontFamily: 'Noto_Sans_JP', 
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    height: 48,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
    color: "#000000",
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: "#467FD3",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 24,
    color: "#666666",
    marginBottom: 24,
  },
});

export default LogIn;
