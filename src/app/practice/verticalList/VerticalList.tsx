import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

import { Item } from "./mockData";

type VerticalListProps = {
  data: Item[];
};

type AnimatedCardProps = {
  item: Item;
  index: number;
  progress: SharedValue<number>;
};

const { height, width } = Dimensions.get("window");

const SPACING = 8;

const CARD_HEIGHT = height * 0.72;

const CARD_WIDTH = width - SPACING * 6;

/**
 * Distance the card travels between two pages.
 *
 * We use the full card height here because we want:
 *
 * Screen 1:
 *     Current card
 *
 * Swipe up:
 *     Current card moves up
 *     Next card comes from below
 *
 * Swipe down:
 *     Current card moves down
 *     Previous card comes from above
 */
const PAGE_HEIGHT = CARD_HEIGHT;

const CARD_TOP = (height - CARD_HEIGHT) / 2;

const SPRING_CONFIG = {
  damping: 18,
  stiffness: 180,
  mass: 0.8,
};

function AnimatedCard({ item, index, progress }: AnimatedCardProps) {
  const animatedStyle = useAnimatedStyle(() => {
    /**
     * Difference between this card and the
     * currently selected card.
     *
     * Example:
     *
     * progress = 0
     *
     * card 0 ->  0
     * card 1 ->  1
     * card 2 ->  2
     *
     * progress = 0.4
     *
     * card 0 -> -0.4
     * card 1 ->  0.6
     * card 2 ->  1.6
     */
    const relativePosition = index - progress.value;

    /**
     * ----------------------------------------
     * VERTICAL POSITION
     * ----------------------------------------
     *
     * Normally:
     *
     * card 0 = 0
     * card 1 = CARD_HEIGHT
     * card 2 = CARD_HEIGHT * 2
     *
     * So cards are completely outside the screen
     * until the user starts dragging.
     */
    const translateY = relativePosition * PAGE_HEIGHT;

    /**
     * ----------------------------------------
     * SCALE
     * ----------------------------------------
     *
     * Current card:
     *
     * 1
     *
     * Incoming card:
     *
     * 0.92 -> 1
     */
    const scale = interpolate(
      Math.abs(relativePosition),
      [0, 0.5, 1],
      [1, 0.96, 0.92],
      Extrapolation.CLAMP,
    );

    /**
     * ----------------------------------------
     * OPACITY
     * ----------------------------------------
     *
     * The next/previous cards are invisible
     * while resting.
     *
     * As they enter the screen they fade in.
     */
    const opacity = interpolate(
      Math.abs(relativePosition),
      [0, 0.35, 0.75, 1],
      [1, 1, 0.6, 0],
      Extrapolation.CLAMP,
    );

    /**
     * Cards closer to the current page are
     * rendered above cards farther away.
     */
    const zIndex = 1000 - Math.round(Math.abs(relativePosition) * 100);

    return {
      opacity,
      zIndex,

      transform: [
        {
          translateY,
        },
        {
          scale,
        },
      ],
    };
  });

  return (
    <Animated.View
      pointerEvents={index === 0 ? "auto" : "none"}
      style={[styles.card, animatedStyle]}
    >
      {/* Blurred background */}
      <Image
        source={{
          uri: item.image,
        }}
        style={[StyleSheet.absoluteFill, styles.backgroundImage]}
        blurRadius={50}
      />

      {/* Main image */}
      <Image
        source={{
          uri: item.image,
        }}
        style={styles.mainImage}
        resizeMode="contain"
      />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.tags}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Classic</Text>
          </View>

          <View style={styles.tag}>
            <Text style={styles.tagText}>Popular</Text>
          </View>

          <View style={styles.tag}>
            <Text style={styles.tagText}>Premium</Text>
          </View>
        </View>

        <Text numberOfLines={3} style={styles.description}>
          {item.description}
        </Text>

        <View style={styles.metadata}>
          <View style={styles.author}>
            <Image
              source={{
                uri: item.author.avatar,
              }}
              style={styles.avatar}
            />

            <Text style={styles.authorName}>{item.author.name}</Text>
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Text style={styles.actionIcon}>🔖</Text>

        <Text style={styles.actionIcon}>◉</Text>
      </View>
    </Animated.View>
  );
}

export default function VerticalList({ data }: VerticalListProps) {
  /**
   * This represents the current page.
   *
   * 0     = first card
   * 1     = second card
   * 2     = third card
   *
   * During a gesture it can be:
   *
   * 0.2
   * 0.5
   * 0.8
   */
  const progress = useSharedValue(0);

  /**
   * Store the position when the gesture starts.
   */
  const startProgress = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      startProgress.value = progress.value;
    })

    .onUpdate((event) => {
      /**
       * Convert the finger's vertical movement
       * into page movement.
       *
       * Swipe UP:
       *
       * event.translationY = negative
       *
       * progress increases.
       *
       * Swipe DOWN:
       *
       * event.translationY = positive
       *
       * progress decreases.
       */
      const nextProgress =
        startProgress.value - event.translationY / PAGE_HEIGHT;

      /**
       * Don't allow going before the first card.
       */
      const clampedProgress = Math.max(
        0,
        Math.min(data.length - 1, nextProgress),
      );

      progress.value = clampedProgress;
    })

    .onEnd((event) => {
      /**
       * Current progress.
       */
      const current = progress.value;

      /**
       * Determine the closest card.
       */
      let destination = Math.round(current);

      /**
       * Add velocity into the decision.
       *
       * This makes a quick flick move to the
       * next card even if the finger didn't travel
       * very far.
       */
      if (event.velocityY < -500) {
        destination = Math.floor(current) + 1;
      }

      if (event.velocityY > 500) {
        destination = Math.ceil(current) - 1;
      }

      /**
       * Clamp destination.
       */
      destination = Math.max(0, Math.min(data.length - 1, destination));

      /**
       * Spring to the selected card.
       */
      progress.value = withSpring(destination, SPRING_CONFIG);
    });

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>
        {data.map((item, index) => (
          <AnimatedCard
            key={item.key}
            item={item}
            index={index}
            progress={progress}
          />
        ))}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    overflow: "hidden",

    backgroundColor: "#111",
  },

  card: {
    position: "absolute",

    width: CARD_WIDTH,
    height: CARD_HEIGHT,

    left: SPACING * 3,
    top: CARD_TOP,

    padding: SPACING * 2,

    borderRadius: 24,

    overflow: "hidden",

    backgroundColor: "#f8f3df",

    gap: SPACING,
  },

  backgroundImage: {
    borderRadius: 24,
  },

  mainImage: {
    width: "100%",
    height: CARD_HEIGHT * 0.48,
  },

  content: {
    flex: 1,

    justifyContent: "flex-end",

    gap: SPACING * 1.5,
  },

  title: {
    fontSize: 32,

    fontWeight: "700",

    color: "#111",
  },

  tags: {
    flexDirection: "row",

    gap: SPACING,
  },

  tag: {
    paddingHorizontal: 14,

    paddingVertical: 7,

    borderRadius: 20,

    backgroundColor: "#111",
  },

  tagText: {
    color: "#fff",

    fontSize: 12,

    fontWeight: "600",
  },

  description: {
    fontSize: 16,

    lineHeight: 24,

    color: "#666",
  },

  metadata: {
    marginTop: SPACING,
  },

  author: {
    flexDirection: "row",

    alignItems: "center",

    gap: SPACING,
  },

  avatar: {
    width: 24,

    height: 24,

    borderRadius: 12,
  },

  authorName: {
    fontSize: 12,

    color: "#666",
  },

  actions: {
    position: "absolute",

    top: SPACING * 2,

    right: SPACING * 2,

    gap: SPACING * 2,

    alignItems: "center",
  },

  actionIcon: {
    fontSize: 22,

    color: "#111",
  },
});
