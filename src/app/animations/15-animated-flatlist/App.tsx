import { FlatList, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import ListItem from "./components/ListItem";

const data = new Array(50).fill(0).map((_, index) => ({
  id: index,
}));

export default function App() {
  const viewableItems = useSharedValue<number[]>([]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={styles.contentContainer}
        onViewableItemsChanged={({ viewableItems: visibleTokens }) => {
          const visibleIds = visibleTokens
            .filter((item) => item.isViewable)
            .map((item) => item.item.id);

          viewableItems.value = visibleIds;
        }}
        renderItem={({ item }) => (
          <ListItem item={item} viewableItems={viewableItems} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  contentContainer: {
    paddingTop: 40,
    paddingBottom: 40,
  },
});
