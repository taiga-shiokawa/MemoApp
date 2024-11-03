import { View, Text, StyleSheet } from "react-native";

const Index = (): JSX.Element => {
  return (
    <View style={styles.container}>
       {/* Header View */}
      <View>
        <View>
          <Text>AI Memo App</Text>
          <Text>logout</Text>
        </View>
      </View>

      {/* Memo List View */}
      <View>
        {/* Memo Item View */}
        <View>
          <View>
            <Text>Test List</Text>
            <Text>2024年11月3日 10:00</Text>
          </View>
          <View>
            <Text>X</Text>
          </View>
        </View>

        {/* Memo Item View */}
        <View>
          <View>
            <Text>Test List</Text>
            <Text>2024年11月3日 10:00</Text>
          </View>
          <View>
            <Text>X</Text>
          </View>
        </View>

        {/* Memo Item View */}
        <View>
          <View>
            <Text>Test List</Text>
            <Text>2024年11月3日 10:00</Text>
          </View>
          <View>
            <Text>X</Text>
          </View>
        </View>

      </View>

      {/* Memo Add Button */}
      <View>
        <Text>＋</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Index;