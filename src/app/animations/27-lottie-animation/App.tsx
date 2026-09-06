import { StyleSheet, View } from "react-native";
import MascotOnboarding from "./MascotOnboarding";

const App = () => {
  return (
    <View style={styles.container}>
      <MascotOnboarding />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;