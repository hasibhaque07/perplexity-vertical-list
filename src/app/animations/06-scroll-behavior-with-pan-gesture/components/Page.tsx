import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import Animated, {
    type SharedValue,
    useAnimatedStyle,
} from "react-native-reanimated";

interface PageProps {
  index: number;
  title: string;
  translateX: SharedValue<number>;
}

export const { width: PAGE_WIDTH } = Dimensions.get("window");

const Page: React.FC<PageProps> = ({ index, title, translateX }) => {
  const pageOffset = PAGE_WIDTH * index;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value + pageOffset,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.page,
        {
          backgroundColor: `rgba(0, 0, 256, 0.${index + 2})`,
        },
        animatedStyle,
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  page: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 70,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
});

export default Page;
