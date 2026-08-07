import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedStyle,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");

const SIZE = width * 0.7;

interface PageProps {
  index: number;
  translateX: SharedValue<number>;
  title: string;
}

const Page = ({ index, translateX, title }: PageProps) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP,
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolation.CLAMP,
    );

    return {
      borderRadius,
      transform: [{ scale }],
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `rgba(0, 0, 255, 0.${index + 2})`,
        },
      ]}
    >
      <Animated.View style={[styles.square, rStyle]} />

      <Animated.View style={[styles.textContainer, rTextStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,

    alignItems: "center",
    justifyContent: "center",
  },

  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0, 0, 255, 0.4)",
  },

  text: {
    fontSize: 60,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
  },

  textContainer: {
    position: "absolute",
  },
});

export default Page;
