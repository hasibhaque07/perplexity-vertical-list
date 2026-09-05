//import firstLottie from "@/assets/lottie/first-lottie.json";
import BookmarkAnimations from "@/assets/lottie/Bookmark.json";
import LottieView from "lottie-react-native";
import { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const BookmarkAnimation = () => {
  const animationRef = useRef<LottieView>(null);

  const [reverse, setReverse] = useState<Boolean>(false);

  const handlePlay = () => animationRef.current?.play();

  function onPress(): void {
    if (reverse) {
      //animationRef.current?.play(299, 0);
      animationRef.current?.play(119, 0);
    } else {
      animationRef.current?.play(0, 119);
    }

    setReverse((prev) => !prev);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <LottieView
          source={BookmarkAnimations}
          style={{ width: 300, height: 300 }}
          loop={false}
          ref={animationRef}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BookmarkAnimation;
