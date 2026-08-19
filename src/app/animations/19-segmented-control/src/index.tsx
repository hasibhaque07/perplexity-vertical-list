import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import SegmentedControl from "./components/segmented-control";
import Palette from "./constants";

const options = ["Light", "Standard", "Pro"];

export default function App() {
  const [selectedOption, setSelectedOption] = useState("Standard");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SegmentedControl
        options={options}
        selectedOption={selectedOption}
        onOptionPress={setSelectedOption}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
