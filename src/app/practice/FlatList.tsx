import { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Sample Dataset
const INITIAL_DATA = [
  { id: "1", title: "Product 1" },
  { id: "2", title: "Product 2" },
  { id: "3", title: "Product 3" },
  { id: "4", title: "Product 4" },
  { id: "5", title: "Product 5" },
  { id: "6", title: "Product 6" },
];

export default function FlatListDemo() {
  const [data, setData] = useState(INITIAL_DATA);
  const [selectedId, setSelectedId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // 1. Pull-to-Refresh Handler (onRefresh & refreshing)
  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate an API network request
    setTimeout(() => {
      setData([
        ...INITIAL_DATA,
        { id: String(Date.now()), title: `New Product ${data.length + 1}` },
      ]);
      setRefreshing(false);
    }, 1500);
  };

  // 2. Header Component (ListHeaderComponent)
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Store Catalog</Text>
      <Text style={styles.subText}>Tap an item to select it</Text>
    </View>
  );

  // 3. Footer Component (ListFooterComponent)
  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>End of Product List</Text>
    </View>
  );

  // 4. Separator Component (ItemSeparatorComponent)
  const renderSeparator = () => <View style={styles.separator} />;

  // Render individual list items
  const renderItem = ({ item }: { item: any }) => {
    const isSelected = item.id === selectedId;

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => setSelectedId(item.id)}
      >
        <Text style={[styles.cardText, isSelected && styles.selectedCardText]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          // --- PROPS DEMONSTRATED --- //

          // Forces list re-render when selectedId updates
          extraData={selectedId}
          // Displays grid view with 2 columns
          numColumns={2}
          // Renders horizontally instead of vertically
          // Note: horizontal must be false (or omitted) if numColumns > 1.
          // To test horizontal mode, set horizontal={true} and comment out numColumns.

          //horizontal={true}

          // Header component at top of the list
          ListHeaderComponent={renderHeader}
          // Footer component at bottom of the list
          ListFooterComponent={renderFooter}
          // Divider component placed between items
          ItemSeparatorComponent={renderSeparator}
          // Pull-to-refresh functionality
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "#6200ee",
    alignItems: "center",
    marginBottom: 8,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  subText: {
    fontSize: 14,
    color: "#e0e0e0",
    marginTop: 4,
  },
  footer: {
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  footerText: {
    fontSize: 14,
    color: "#888",
  },
  separator: {
    height: 10,
  },
  card: {
    flex: 1,
    margin: 6,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: "#6200ee",
  },
  cardText: {
    fontSize: 16,
    color: "#333",
  },
  selectedCardText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
