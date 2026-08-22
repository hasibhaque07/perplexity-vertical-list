import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedRef,
  useScrollOffset,
} from "react-native-reanimated";

import StoryListItem, {
  StoryListItemHeight,
  StoryListItemWidth,
  WindowWidth,
} from "./components/story-list-item";
import { BACKGROUND_COLOR, Stories } from "./constants";

const App = () => {
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(animatedRef);

  const ListPadding = WindowWidth - StoryListItemWidth;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View
        style={{
          height: StoryListItemHeight,
          width: "100%",
        }}
      >
        <Animated.ScrollView
          ref={animatedRef}
          horizontal
          snapToInterval={StoryListItemWidth}
          decelerationRate="fast"
          disableIntervalMomentum
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{
            width: StoryListItemWidth * Stories.length + ListPadding,
          }}
        >
          {Stories.map((story, index) => (
            <StoryListItem
              index={index}
              imageSource={story.image}
              key={index}
              scrollOffset={scrollOffset}
            />
          ))}
        </Animated.ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
