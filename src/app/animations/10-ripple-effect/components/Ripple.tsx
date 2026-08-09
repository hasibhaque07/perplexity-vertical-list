import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    measure,
    useAnimatedRef,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

interface RippleProps {
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  onTap?: () => void;
  children: React.ReactNode;
}

const Ripple: React.FC<RippleProps> = ({
  style,
  contentContainerStyle,
  onTap,
  children,
}) => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);

  const scale = useSharedValue(0);

  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const rippleOpacity = useSharedValue(1);

  const aRef = useAnimatedRef<Animated.View>();

  const tapGesture = Gesture.Tap()
    .onStart((event) => {
      const layout = measure(aRef);

      width.value = layout?.width ?? 0;
      height.value = layout?.height ?? 0;

      centerX.value = event.x;
      centerY.value = event.y;

      rippleOpacity.value = 1;
      scale.value = 0;

      scale.value = withTiming(1, {
        duration: 1000,
      });
    })
    .onEnd(() => {
      if (onTap) {
        scheduleOnRN(onTap);
      }
    })
    .onFinalize(() => {
      rippleOpacity.value = withTiming(0);
    });

  const rStyle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);

    const translateX = centerX.value - circleRadius;

    const translateY = centerY.value - circleRadius;

    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: rippleOpacity.value,
      backgroundColor: "rgba(0,0,0,0.2)",
      position: "absolute",
      top: 0,
      left: 0,

      transform: [
        {
          translateX,
        },
        {
          translateY,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View
        ref={aRef}
        style={[
          style,
          {
            overflow: "hidden",
          },
        ]}
      >
        <Animated.View style={contentContainerStyle}>{children}</Animated.View>

        <Animated.View style={rStyle} />
      </Animated.View>
    </GestureDetector>
  );
};

export default Ripple;
