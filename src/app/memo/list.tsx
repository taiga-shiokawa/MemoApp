import { View, StyleSheet, FlatList } from "react-native";
import MemoListItem from "../../components/MemoListItem";
import CircleButton from "../../components/CircleButton";
import { Feather } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import LogOutButton from "../../components/LogOutButton";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../config";
import { Memo } from "../../types/memo";

const handlePress = (): void => {
  router.push("/memo/create");
};

const List = (): JSX.Element => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <LogOutButton />;
      },
    });
  }, []);

  // メモの監視
  useEffect(() => {
    if (auth.currentUser === null) { return }
    const ref = collection(db, `users/${auth.currentUser?.uid}/memos`);
    const q = query(ref, orderBy("updatedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteMemos: Memo[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        // データの存在確認を追加
        if (data && data.bodyText && data.updatedAt) {
          remoteMemos.push({
            id: doc.id,
            bodyText: data.bodyText,
            updatedAt: data.updatedAt
          });
        }
      });
      setMemos(remoteMemos);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {/* Memo list view */}
      <FlatList 
        data={memos} 
        renderItem={({ item }) => (<MemoListItem memo={item} />)}
      />

      {/* Memo add button */}
      <CircleButton onPress={handlePress}>
        <Feather name="plus" size={40} />
      </CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  // All screen
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

export default List;
