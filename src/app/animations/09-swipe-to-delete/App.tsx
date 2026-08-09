import { StatusBar } from "expo-status-bar";
import { useCallback, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import {
    GestureHandlerRootView,
    ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ListItem from "./components/ListItem";

const TITLES = [
  "Record the dismissible tutorial 🎥",
  "Leave 👍🏼 to the video",
  "Check YouTube comments",
  "Subscribe to the channel 🚀",
  "Leave a ⭐️ on the GitHub Repo",
];

interface TaskInterface {
  title: string;
  index: number;
}

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({
  title,
  index,
}));

const BACKGROUND_COLOR = "#FAFBFF";

function App() {
  const [tasks, setTasks] = useState(TASKS);

  const onDismiss = useCallback((task: TaskInterface) => {
    setTasks((tasks) => tasks.filter((item) => item.index !== task.index));
  }, []);

  const scrollRef = useRef<ScrollView>(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.title}>Tasks</Text>

      <ScrollView ref={scrollRef} style={{ flex: 1 }}>
        {tasks.map((task) => (
          <ListItem
            key={task.index}
            task={task}
            onDismiss={onDismiss}
            scrollRef={scrollRef}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default function Root() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },

  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: "5%",
  },
});

export { TaskInterface };

