import blinkAnimation from "@/assets/lottie/blink.json";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

const BlinkOnTouch = () => {
  const animationRef = useRef<LottieView>(null);

  const handleTouchStart = () => {
    // Play the blink animation from beginning to end
    animationRef.current?.play(0, 132);
  };

  const handleTouchEnd = () => {
    // Stop the animation and return to normal/open eyes
    animationRef.current?.reset();
    //animationRef.current?.play(132, 0);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPressIn={handleTouchStart}
        onPressOut={handleTouchEnd}
      >
        <View>
          <LottieView
            ref={animationRef}
            source={blinkAnimation}
            style={styles.mascot}
            loop={false}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  mascot: {
    width: 500,
    height: 500,
  },
});

export default BlinkOnTouch;
