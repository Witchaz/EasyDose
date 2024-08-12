import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View, Text, Platform } from "react-native";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native-gesture-handler";
import PagerView from "react-native-pager-view";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable } from "react-native";

export default function TabTwoScreen() {
  return (
    <ThemedView style={styles.header}>
      <ThemedText style={styles.title}>Upload image</ThemedText>
      <Pressable style={styles.button} onPress={() => router.push("/camera")}>
        <ThemedText type="link">Open camera</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  header: {
    alignItems: "center",
    paddingTop: Platform.select({ ios: 64, android: 48 }),
    paddingBottom: 24,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
  },
});
