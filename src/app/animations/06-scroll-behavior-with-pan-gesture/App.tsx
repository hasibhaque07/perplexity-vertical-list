import { StyleSheet } from "react-native";
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
    cancelAnimation,
    useDerivedValue,
    useSharedValue,
    withDecay,
} from "react-native-reanimated";

import Page, { PAGE_WIDTH } from "./components/Page";

const titles = ["What's", "up", "mobile", "devs?"];

const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);

export default function App() {
  const translateX = useSharedValue(0);

  const startX = useSharedValue(0);

  const clampedTranslateX = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Remember where the previous gesture ended
      startX.value = clampedTranslateX.value;

      // Stop any previous decay animation
      cancelAnimation(translateX);
    })
    .onUpdate((event) => {
      // Move relative to where the gesture started
      translateX.value = startX.value + event.translationX;
    })
    .onEnd((event) => {
      // Continue moving naturally after releasing
      translateX.value = withDecay({
        velocity: event.velocityX,
      });
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={styles.container}>
          {titles.map((title, index) => (
            <Page
              key={title}
              index={index}
              title={title}
              translateX={clampedTranslateX}
            />
          ))}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
