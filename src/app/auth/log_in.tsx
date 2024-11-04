import { StyleSheet, Text, TextInput, View } from "react-native";
import Header from "../../components/Header";
import Button from "../../components/Button";

const LogIn = (): JSX.Element => {
  return (
    <View style={styles.container}>
      {/* Common header */}
      <Header />

      {/* Title */}
      <View style={styles.inner}>
        <Text style={styles.title}>LogIn</Text>
        {/* Input */}
        <TextInput style={styles.input} value="Email address" />
        <TextInput style={styles.input} value="password" />
        {/* 送信ボタン */}
        <Button label="submit"/>

        {/* アサインアップページへ遷移 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not registered?</Text>
          <Text style={styles.footerLink}>Sign up here!</Text>
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
