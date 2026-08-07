import React, { ReactNode, useEffect } from "react";
import { Dimensions, Modal, Pressable, StyleSheet, View } from "react-native";
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

const { height } = Dimensions.get("window");

const ANIMATION_DURATION = 300;

type Props = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function BottomModal({ visible, onClose, children }: Props) {
  const translateY = useSharedValue(height);
  const opacity = useSharedValue(0);

  const [mounted, setMounted] = React.useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);

      opacity.value = withTiming(1, {
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.cubic),
      });

      translateY.value = withTiming(0, {
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.cubic),
      });
    } else if (mounted) {
      opacity.value = withTiming(0, {
        duration: ANIMATION_DURATION,
        easing: Easing.in(Easing.cubic),
      });

      translateY.value = withTiming(
        height,
        {
          duration: ANIMATION_DURATION,
          easing: Easing.in(Easing.cubic),
        },
        (finished) => {
          if (finished) {
            runOnJS(setMounted)(false);
          }
        },
      );
    }
  }, [visible]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!mounted) return null;

  return (
    <Modal transparent statusBarTranslucent animationType="none">
      <View style={StyleSheet.absoluteFill}>
        <Animated.View style={[styles.overlay, overlayStyle]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        <Animated.View style={[styles.sheet, sheetStyle]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#000",
    opacity: 0.4,
  },

  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    backgroundColor: "white",

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    padding: 20,

    minHeight: 200,
  },
});
