import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native"
import { auth, db } from "../config"
import { deleteUser, signInAnonymously } from "@firebase/auth"
import { router } from "expo-router";
import { collection, deleteDoc, getDocs } from "firebase/firestore";

// ログアウト
// const handlePress = (): void => {
//   signOut(auth)
//     .then(() => {
//       router.replace("/auth/log_in");
//     })
//     .catch((error) => {
//       const { code, message } = error;
//       console.log(code, message);
//       Alert.alert(message);
//     });
// }

// アカウント削除
const handleDeleteAccount = async () => {
  Alert.alert(
    "データの削除",
    "すべてのデータが削除されます。この操作は取り消せません。\n\n削除してもよろしいですか？",
    [
      {
        text: "キャンセル",
        style: "cancel"
      },
      {
        text: "削除する",
        style: "destructive",
        onPress: async () => {
          const user = auth.currentUser;
          if (!user) return;

          try {
            // ユーザーのデータを削除
            const memosRef = collection(db, `users/${user.uid}/memos`);
            const querySnapshot = await getDocs(memosRef);
            const deletePromises = querySnapshot.docs.map(doc => 
              deleteDoc(doc.ref)
            );
            await Promise.all(deletePromises);

            // アカウントを削除
            await deleteUser(user);

            // 新しい匿名アカウントを作成
            await signInAnonymously(auth);
            
            // ホーム画面に戻る
            router.replace("/memo/list");

            // 完了通知
            Alert.alert(
              "完了",
              "データを削除しました。\n新しく始めることができます。"
            );

          } catch (error) {
            console.error("Error deleting account:", error);
            Alert.alert(
              "エラー",
              "データの削除中にエラーが発生しました。"
            );
          }
        }
      }
    ]
  );
};

const LogOutButton = (): JSX.Element => {
  return (
    <TouchableOpacity onPress={handleDeleteAccount}>
      <Text style={styles.text}>アカウント削除</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    lineHeight: 16,
    color: "rgba(255, 255, 255, 0.7)",
  }
})

export default LogOutButton;