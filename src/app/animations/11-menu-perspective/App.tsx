import { Feather } from "@expo/vector-icons";
import { useCallback } from "react";
import { Dimensions, Platform, StyleSheet } from "react-native";
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const THRESHOLD = SCREEN_WIDTH / 3;

const BACKGROUND_COLOR = "#1e1e23";

export default function App() {
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Nothing needed here because we use
      // absolute translation from the gesture.
    })
    .onUpdate((event) => {
      // Prevent the view from moving to the left.
      translateX.value = Math.max(event.translationX, 0);
    })
    .onEnd(() => {
      if (translateX.value <= THRESHOLD) {
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(SCREEN_WIDTH / 2);
      }
    });

  const rStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 3],
      "clamp",
    );

    const borderRadius = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 15],
      "clamp",
    );

    return {
      borderRadius,

      transform: [
        {
          perspective: 100,
        },
        {
          translateX: translateX.value,
        },
        {
          rotateY: `-${rotate}deg`,
        },
      ],
    };
  });

  const onPress = useCallback(() => {
    if (translateX.value > 0) {
      translateX.value = withTiming(0);
    } else {
      translateX.value = withTiming(SCREEN_WIDTH / 2);
    }
  }, []);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
      }}
    >
      <SafeAreaView style={[styles.container, styles.safe]}>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              {
                backgroundColor: "white",
                flex: 1,
              },
              rStyle,
            ]}
          >
            <Feather
              name="menu"
              size={32}
              color={BACKGROUND_COLOR}
              style={{
                margin: 15,
                position: "absolute",
              }}
              onPress={onPress}
            />
          </Animated.View>
        </GestureDetector>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },

  safe: {
    // Android SafeAreaView workaround
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
});
