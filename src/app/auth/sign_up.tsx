import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "../../components/Button";
import { router } from "expo-router";

const handlePress = () :void => {
  // 会員登録処理
  router.push("/memo/list");
}

const goToLogIn = (): void => {
  router.replace("/auth/log_in");
}

const SignUp = (): JSX.Element => {
  return (
    <View style={styles.container}>

      {/* Title */}
      <View style={styles.inner}>
        <Text style={styles.title}>Sign Up</Text>
        {/* Input */}
        <TextInput style={styles.input} value="Email address" />
        <TextInput style={styles.input} value="password" />
        {/* 送信ボタン */}
        <Button label="submit" onPress={handlePress}/>

        {/* ログインページへ遷移 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registered?</Text>
          <TouchableOpacity onPress={goToLogIn}>
            <Text style={styles.footerLink}>Log in.</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    marginBottom: 24,
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
});

export default SignUp;
