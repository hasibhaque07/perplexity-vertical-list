import blinkAnimation from "@/assets/lottie/mascot.json";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

const MascotOnboarding = () => {
    return (
        <LinearGradient
            colors={["#F8F5FF", "#FFFFFF"]}
            style={styles.container}
        >
            <View style={styles.content}>
                {/* Mascot */}
                <View style={styles.mascotContainer}>
                    <LottieView
                        source={blinkAnimation}
                        style={styles.mascot}
                        autoPlay

                    />
                </View>

                {/* Text */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        Your little companion{"\n"}is here for you
                    </Text>

                    <Text style={styles.description}>
                        Meet your new mascot and make every moment
                        a little more fun and memorable.
                    </Text>
                </View>
            </View>

            {/* Bottom CTA */}
            <View style={styles.bottomContainer}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={() => {
                        // Navigate to the next onboarding screen
                    }}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </Pressable>

                <Text style={styles.footerText}>
                    Let's get started together
                </Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 24,
    },

    mascotContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 70,
        marginBottom: 10,
    },

    mascot: {
        width: 320,
        height: 320,
    },

    textContainer: {
        alignItems: "center",
        paddingHorizontal: 10,
    },

    title: {
        fontSize: 32,
        lineHeight: 40,
        fontWeight: "800",
        color: "#222222",
        textAlign: "center",
        letterSpacing: -0.7,
    },

    description: {
        marginTop: 16,
        maxWidth: 330,
        fontSize: 18,
        lineHeight: 24,
        fontWeight: "400",
        color: "#77727F",
        textAlign: "center",
    },

    bottomContainer: {
        paddingHorizontal: 24,
        paddingBottom: 32,
        alignItems: "center",
    },

    button: {
        width: "100%",
        height: 58,
        borderRadius: 18,
        backgroundColor: "#01A652",
        alignItems: "center",
        justifyContent: "center",

        shadowColor: "#01A652",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 6,
    },

    buttonPressed: {
        opacity: 0.85,
        transform: [{ scale: 0.98 }],
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },

    footerText: {
        marginTop: 14,
        fontSize: 13,
        color: "#A09BA8",
    },
});

export default MascotOnboarding;