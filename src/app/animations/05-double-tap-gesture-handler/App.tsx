import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    View,
} from "react-native";
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const { width: SIZE } = Dimensions.get("window");

export default function App() {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    //transform: [{ scale: Math.max(scale.value, 0) }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(250)
    .onEnd(() => {
      scale.value = withSpring(1, undefined, (isFinished) => {
        if (isFinished) {
          scale.value = withDelay(500, withSpring(0));
        }
      });
    });

  // .onEnd((_event, success) => {
  //   if (!success) return;

  //   scale.value = withSpring(1, undefined, (isFinished) => {
  //     if (isFinished) {
  //       scale.value = withDelay(500, withSpring(0));
  //     }
  //   });
  // });

  const singleTap = Gesture.Tap().onEnd((_event, success) => {
    if (!success) return;

    opacity.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) {
        opacity.value = withDelay(500, withTiming(1));
      }
    });
  });

  const tapGesture = Gesture.Exclusive(doubleTap, singleTap);

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <GestureDetector gesture={tapGesture}>
          <Animated.View>
            <ImageBackground
              source={require("./assets/image.jpeg")}
              style={styles.image}
            >
              <AnimatedImage
                source={require("./assets/heart.png")}
                style={[styles.image, styles.heart, imageStyle]}
                resizeMode="center"
              />
            </ImageBackground>

            <Animated.Text style={[styles.turtles, textStyle]}>
              🐢🐢🐢🐢
            </Animated.Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: SIZE,
    height: SIZE,
  },

  heart: {
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.35,
    shadowRadius: 35,
  },

  turtles: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 30,
  },
});
