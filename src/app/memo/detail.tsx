import { Text, View, ScrollView, StyleSheet } from "react-native";
import CircleButton from "../../components/CircleButton";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";

const handlePress = (): void => {
  router.push("/memo/edit");
}

const Detail = (): JSX.Element => {
  return (
    <View style={styles.container}>

      {/* Memo detail title  */}
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle}>Test List</Text>
        <Text style={styles.memoDate}>2024年11月3日 10:00</Text>
      </View>

      {/* Contents */}
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoBodyText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  memoBodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
  },
});

export default Detail;
