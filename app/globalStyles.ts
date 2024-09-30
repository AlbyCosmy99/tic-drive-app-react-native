import { StatusBar, StyleSheet } from "react-native";
import isIOSPlatform from "./utils/IsIOSPlatform";

export const globalStyles = StyleSheet.create({
    safeAreaView: {
        paddingTop: isIOSPlatform() ? 0 : StatusBar.currentHeight
    }
})