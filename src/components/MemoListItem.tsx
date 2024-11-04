import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"

const MemoListItem = (): JSX.Element => {
  return (
    <Link href="/memo/detail" asChild>
      <TouchableOpacity style={styles.memoListItem}>
        <View>
          <Text style={styles.memoListItemTitle}>Test List</Text>
          <Text style={styles.memoListItemDate}>2024年11月3日 10:00</Text>
        </View>
        <View>
          <TouchableOpacity>
          <AntDesign name="delete" size={24} color="#b0b0b0" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

const styles = StyleSheet.create({
  // メモリスト
  memoListItem: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12, 
    lineHeight: 16,
    color: "#848484",
  },
})

export default MemoListItem;