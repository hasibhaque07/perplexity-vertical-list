import blinkAnimation from "@/assets/lottie/mascot.json";
import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

const MascotBlink = () => {
    return (
        <View style={styles.container}>
            <LottieView
                source={blinkAnimation}
                style={{ width: 300, height: 300 }}
                autoPlay
            />
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

export default MascotBlink;
