import { Colors } from "@/constants/Colors"
import { Pressable, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { Text } from "react-native"
import HorizontalLine from "../../HorizontalLine"

const UserCarCard = () => {
    return (
        <View className="border rounded-lg flex my-2" style={styles.cardContainer}>
            <View className="p-4">
                <View className="flex flex-row items-center mb-2">
                    <Text className="text-tic flex-1">Title</Text>
                    <Text className="font-medium" style={styles.carDetail}>Dad's car</Text>
                </View>
                <View className="flex flex-row items-center mb-2">
                    <Text className="text-tic flex-1">Type</Text>
                    <Text className="font-medium" style={styles.carDetail}>SEDAN</Text>
                </View>
                <View className="flex flex-row items-center mb-2">
                    <Text className="text-tic flex-1">Mileage</Text>
                    <Text className="font-medium" style={styles.carDetail}>5k-50k</Text>
                </View>
                <View className="flex flex-row items-center mb-2">
                    <Text className="text-tic flex-1">Licence plate</Text>
                    <Text className="font-medium" style={styles.carDetail}>KK890JJ</Text>
                </View>
            </View>
            <HorizontalLine color={Colors.light.lightGrey} />
            <View className="p-4 flex flex-row">
                <Pressable className="mr-10">
                    <Text className="text-drive font-medium">Edit</Text>
                </Pressable>
                <Pressable>
                    <Text className="text-tic font-medium">Delete</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    carDetail: {
        flex: 1.5
    },
    cardContainer: {
        borderColor: Colors.light.lightGrey
    }
})
export default UserCarCard