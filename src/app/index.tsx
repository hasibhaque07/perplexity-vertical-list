import { StyleSheet, View } from "react-native";
import VerticalList from "./VerticalList";
import data from "./mockData";

export default function Index() {
  //console.log(data);
  return (
    <View style={styles.container}>
      <VerticalList data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
  },
});
