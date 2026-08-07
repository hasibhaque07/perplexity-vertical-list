import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { Button, Text, View } from "react-native";

export default function Example() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["40%", "80%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("sheet index:", index);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button
        title="Open"
        onPress={() => {
          console.log("pressed");
          console.log(bottomSheetRef.current);

          bottomSheetRef.current?.snapToIndex(0);
        }}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Hello</Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
