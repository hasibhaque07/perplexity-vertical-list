import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { Button, StyleSheet, Text } from "react-native";

export default function Example() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["40%", "75%"], []);

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    //console.log("Sheet index:", index);
  }, []);

  return (
    <>
      <Button title="Open Bottom Sheet" onPress={handlePresentModal} />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.title}>Hello 👋</Text>
          <Text>This is a BottomSheetModal.</Text>

          <Button
            title="Close"
            onPress={() => bottomSheetModalRef.current?.dismiss()}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
