import { View, StyleSheet } from "react-native";
import Header from "../components/Header";
import MemoListItem from "../components/MemoListItem";
import CircleButton from "../components/CircleButton";

const Index = (): JSX.Element => {
  return (
    <View style={styles.container}>
      {/* Header View */}
      <Header />

      {/* Memo List View */}
      <View>
        {/* Memo List Item View */}
        <MemoListItem />

      </View>

      {/* Memo Add Button */}
      <CircleButton>＋</CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  // 画面全体
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

export default Index;
