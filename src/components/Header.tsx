import { Text, View, StyleSheet } from "react-native";

// 使っていない
const Header = (): JSX.Element => {
  return (
    <View style={styles.header}>
      <View style={styles.headerInner}>
        <Text style={styles.headerTitle}>AI Memo App</Text>
        <Text style={styles.headerRight}>logout</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
   header: {
    backgroundColor: "#467FD3",
    height: 104,
    justifyContent: "flex-end",
  },
  headerInner: {
    alignItems: "center",
  },
  headerTitle: {
    marginBottom: 8,
    fontSize: 22,
    lineHeight: 32,
    fontWeight: "bold",
    color: "#ffffff",
  },
  headerRight: {
    position: "absolute",
    right: 16,
    bottom: 16,
    color: "rgba(255, 255, 255, 0.7)",
  },
})

export default Header;