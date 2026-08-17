import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

type ListItemProps = {
  item: {
    id: number;
  };

  viewableItems: {
    value: number[];
  };
};

const ListItem = React.memo(({ item, viewableItems }: ListItemProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    let isVisible = false;

    for (let i = 0; i < viewableItems.value.length; i++) {
      if (viewableItems.value[i] === item.id) {
        isVisible = true;
        break;
      }
    }

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  });

  return <Animated.View style={[styles.listItem, animatedStyle]} />;
});

const styles = StyleSheet.create({
  listItem: {
    height: 80,
    width: "90%",
    backgroundColor: "#78CAD2",
    alignSelf: "center",
    borderRadius: 15,
    marginTop: 20,
  },
});

export default ListItem;
