import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "../../components/Button";
import { router } from "expo-router";
import { useState } from "react";

const handlePress =(): void => {
  // ログイン処理
  router.replace("/memo/list");
}

const goToSignUp = (): void => {
  router.replace("/auth/sign_up");
}

const LogIn = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>

      {/* Title */}
      <View style={styles.inner}>
        <Text style={styles.title}>LogIn</Text>
        {/* Input */}
        <TextInput 
          style={styles.input} 
          value={email}
          onChangeText={(text) => {setEmail(text)}}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email address"
          textContentType="emailAddress"
        />
        <TextInput 
          style={styles.input} 
          value={password} 
          onChangeText={(text) => {setPassword(text)}}
          autoCapitalize="none"
          secureTextEntry
          placeholder="Password"
          textContentType="password"
        />
        {/* 送信ボタン */}
        <Button label="submit" onPress={handlePress}/>

        {/* アサインアップページへ遷移 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not registered?</Text>
          <TouchableOpacity onPress={goToSignUp}>
            <Text style={styles.footerLink}>Sign up here!</Text>
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

export default LogIn;
