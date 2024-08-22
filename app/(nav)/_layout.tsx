import TicDriveButton from "@/components/TicDriveButton";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ServicesCards from "@/components/ServicesCards";
import TicDriveNavbar from "@/components/navigation/TicDriveNavbar";
import SegmentedControl from "@/components/SegmentedControl";

export default function Nav() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <TicDriveNavbar onPress={() => alert('options')} />
            <View style={styles.contentContainer}>
                <LinearGradient
                    colors={['#FFFFFF', '#FBFBFB']}
                    style={styles.content}
                >
                    <Text style={styles.headerText}>What service are you looking for?</Text>
                    <ServicesCards />
                </LinearGradient>
            </View>
            <TicDriveButton text="Book a service"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ededed',
    },
    content: {
        flex: 1,
    },
    headerText: {
        fontWeight: '500',
        fontSize: 30,
        marginHorizontal: 15,
        marginBottom: 8,
    }
});
