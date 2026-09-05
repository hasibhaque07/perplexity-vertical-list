//import firstLottie from "@/assets/lottie/first-lottie.json";
import blinkAnimation from "@/assets/lottie/blink.json";
import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

const SimpleExample = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={blinkAnimation}
        style={{ width: 500, height: 500 }}
        autoPlay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SimpleExample;
