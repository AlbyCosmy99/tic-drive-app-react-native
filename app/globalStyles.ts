import { Platform, StatusBar, StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    safeAreaView: {
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    }
})