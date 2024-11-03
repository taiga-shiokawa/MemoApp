import { View, Text, StyleSheet, type TextStyle } from "react-native"

interface Props {
  children: string;
  bang?: boolean;
  style?: TextStyle;
}

const Hello = (props: Props): JSX.Element => {
  const { children, bang, style } = props;
  return (
    <View>
      <Text style={[styles.text, style]}> 
        {/* 右側優先だからstyleが優先され, その次にstyle.text */}
        Hello {children} {
          bang && "!"
        }
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    backgroundColor: "blue",
    fontSize: 40, 
    fontWeight: "bold",
    padding: 16,
  },
});

export default Hello;