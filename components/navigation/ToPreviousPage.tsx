import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ToPreviousPage = () => {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className="m-2 mb-7"
      accessible={true}
      accessibilityLabel="Back to previous page"
    >
      <Ionicons
        name="arrow-back"
        size={30}
        color={colorScheme === "light" ? Colors.white : Colors.black}
      />
    </TouchableOpacity>
  );
};

export default ToPreviousPage;
