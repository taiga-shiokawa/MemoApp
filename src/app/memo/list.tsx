import { View, StyleSheet } from "react-native";
import Header from "../../components/Header";
import MemoListItem from "../../components/MemoListItem";
import CircleButton from "../../components/CircleButton";
import { Feather } from "@expo/vector-icons";

const List = (): JSX.Element => {
  return (
    <View style={styles.container}>
      {/* Header view */}
      <Header />

      {/* Memo list view */}
      <View>
        {/* Memo list item view */}
        <MemoListItem />
      </View>

      {/* Memo add button */}
      <CircleButton>
        <Feather name="plus" size={40}/>
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
