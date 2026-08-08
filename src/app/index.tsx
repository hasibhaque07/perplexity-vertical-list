import { StyleSheet, View } from "react-native";
import App from "./animations/06-scroll-behavior-with-pan-gesture/App";

export default function Index() {
  //console.log(data);
  return (
    <View style={styles.container}>
      {/* <VerticalList data={data} /> */}
      <App />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#111",
    justifyContent: "center",
  },
});
