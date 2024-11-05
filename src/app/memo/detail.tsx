import { Text, View, ScrollView, StyleSheet } from "react-native";
import CircleButton from "../../components/CircleButton";
import { Entypo } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Memo } from "../../types/memo";
import { auth, db } from "../../config";
import { doc, onSnapshot } from "firebase/firestore";

const handlePress = (): void => {
  router.push("/memo/edit");
}

const Detail = (): JSX.Element => {
  // メモのidを受け取る
  const { id } = useLocalSearchParams();
  console.log(`Memo id: ${id}`);
  const [memo, setMemo] = useState<Memo | null>(null);
  useEffect(() => {
    if (auth.currentUser === null) { return }
    const ref = doc(db, `users/${auth.currentUser?.uid}/memos`, String(id)); 
    const unsubscribe = onSnapshot(ref, (memoDoc) => {
      console.log(memoDoc.data());
      const { bodyText, updatedAt } = memoDoc.data() as Memo;
      setMemo({
        id: memoDoc.id,
        bodyText,
        updatedAt,
      });
      return unsubscribe;
    });
  }, []);

  return (
    <View style={styles.container}>

      {/* Memo detail title  */}
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>{memo?.bodyText}</Text>
        <Text style={styles.memoDate}>{memo?.updatedAt?.toDate().toLocaleString("ja-JP")}</Text>
      </View>

      {/* Contents */}
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoBodyText}>
          {memo?.bodyText}
        </Text>
      </ScrollView>

      {/* Memo edit button */}
      <CircleButton onPress={handlePress} style={{ top: 60, bottom: "auto" }}>
        <Entypo name="edit" size={24} color="#ffffff" />
      </CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  memoHeader: {
    backgroundColor: "#467FD3",
    height: 96,
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: "#ffffff",
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "bold",
  },
  memoDate: {
    color: "#ffffff",
    fontSize: 12,
    lineHeight: 16,
  },
  memoBody: {
    paddingHorizontal: 27,
  },
  memoBodyText: {
    paddingVertical: 32,
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
  },
});

export default Detail;
