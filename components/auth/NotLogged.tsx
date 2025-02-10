import LinearGradientViewLayout from "@/app/layouts/LinearGradientViewLayout"
import SafeAreaViewLayout from "@/app/layouts/SafeAreaViewLayout"
import { Text } from "react-native"
import TicDriveAuthButton from "../ui/buttons/TicDriveAuthButton"

const NotLogged = () => {
    return (
        <LinearGradientViewLayout>
        <SafeAreaViewLayout tailwindCss='items-center justify-center'>
        <Text className='font-medium text-lg mb-2'>You are not logged in.</Text>
        <Text className='font-medium text-md mb-4'>Login or register using the button below.</Text>
        <TicDriveAuthButton action='login' />
      </SafeAreaViewLayout>
      </LinearGradientViewLayout>
    )
}

export default NotLogged