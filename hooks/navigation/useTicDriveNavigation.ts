import NavigationContext from "@/stateManagement/contexts/nav/NavigationContext";
import { useContext } from "react";

const useTicDriveNavigation = () => {
    const {navigation} = useContext(NavigationContext);
    return navigation
}

export default useTicDriveNavigation