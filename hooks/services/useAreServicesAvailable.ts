import { useAppSelector } from "@/stateManagement/redux/hooks";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

const useAreServicesAvailable = () => {
    const [areServicesAvailable, setAreServicesAvailable] = useState(false)
    const servicesChoosenByUsers = useAppSelector(state => state.services.servicesChoosenByUsers)

    useEffect(() => {
        setAreServicesAvailable(servicesChoosenByUsers?.length > 0);
    }, []);

    return {areServicesAvailable, setAreServicesAvailable}
}

export default useAreServicesAvailable