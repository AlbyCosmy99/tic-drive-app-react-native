import { StackAnimationTypes } from "react-native-screens";

const getAnimation = (route?: any): StackAnimationTypes => {
    if (route?.params?.animation) {
      return route?.params?.animation
    }
    return 'default';
};

export default getAnimation