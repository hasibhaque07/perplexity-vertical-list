import { StyleSheet, View } from "react-native";
import App from "./animations/17-circular-carousel/App";
//import VerticalList from "./animations/00-perplexity-verticallist/VerticalList";
//import data from "./animations/00-perplexity-verticallist/mockData";
//import VerticalList from "./practice/verticalList/VerticalList";

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
    //backgroundColor: "#111",
    justifyContent: "center",
  },
});
