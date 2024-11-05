import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native"
import { Memo } from "../types/memo";
import { auth, db } from "../config";
import { deleteDoc, doc } from "firebase/firestore";

interface Props {
  memo: Memo;
}

const handlePress = (id: string): void => {
  if (auth.currentUser === null) { return }
  const ref = doc(db, `users/${auth.currentUser?.uid}/memos`, id);
  Alert.alert("メモを削除します", "よろしいですか？", [
    {
      text: "キャンセル"
    },
    {
      text: "削除する",
      style: "destructive",
      onPress: () => {
        deleteDoc(ref)
          .catch(() => {
            Alert.alert("削除に失敗しました");
          })
      }
    },
  ]);
}

const MemoListItem = (props: Props): JSX.Element | null => {
  const { memo } = props;
  const { bodyText, updatedAt } = memo;
  if (bodyText === null || updatedAt === null) { return null }
  const dateString = updatedAt.toDate().toLocaleString("ja-JP");
  // 文字列を指定の長さで切り詰める関数
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    // メモのidを渡して詳細に遷移する
    <Link href={{ pathname: "/memo/detail", params: { id: memo.id }}} asChild> 
      <TouchableOpacity style={styles.memoListItem}>
        <View>
          <Text numberOfLines={1}  style={styles.memoListItemTitle}>{truncateText(bodyText, 20)}</Text>
          <Text style={styles.memoListItemDate}>{dateString}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => { handlePress(memo.id) }}>
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