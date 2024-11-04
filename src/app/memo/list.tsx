import { View, StyleSheet } from "react-native";
import MemoListItem from "../../components/MemoListItem";
import CircleButton from "../../components/CircleButton";
import { Feather } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import LogOutButton from "../../components/LogOutButton";

const handlePress = (): void => {
  router.push("/memo/create");
}

const List = (): JSX.Element => {

  const navigation = useNavigation();

  useEffect(() => {
  navigation.setOptions({
    headerRight: () => {
      return <LogOutButton />
    }
  })
  }, []);

  return (
    <View style={styles.container}>

      {/* Memo list view */}
      <View>
        {/* Memo list item view */}
        <MemoListItem />
      </View>

      {/* Memo add button */}
      <CircleButton onPress={handlePress}>
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
