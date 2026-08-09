import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { TaskInterface } from "../App";

interface ListItemProps {
  task: TaskInterface;
  onDismiss?: (task: TaskInterface) => void;
  scrollRef: React.RefObject<any>;
}

const LIST_ITEM_HEIGHT = 70;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const ListItem: React.FC<ListItemProps> = ({ task, onDismiss, scrollRef }) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .simultaneousWithExternalGesture(scrollRef)
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;

      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);

        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);

        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            scheduleOnRN(onDismiss, task);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const rIconContainerStyle = useAnimatedStyle(() => {
    const iconOpacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0,
    );

    return {
      opacity: iconOpacity,
    };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.taskContainer, rTaskContainerStyle]}>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <FontAwesome5
          name="trash-alt"
          size={LIST_ITEM_HEIGHT * 0.4}
          color="red"
        />
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.task, rStyle]}>
          <Text style={styles.taskTitle}>{task.title}</Text>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    width: "100%",
    alignItems: "center",
  },

  task: {
    width: "90%",
    height: LIST_ITEM_HEIGHT,
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: "white",
    borderRadius: 10,

    shadowOpacity: 0.08,

    shadowRadius: 10,

    elevation: 5,
  },

  taskTitle: {
    fontSize: 16,
  },

  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: "absolute",
    right: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListItem;
