import DeviceInfo from 'react-native-device-info'

const isIphoneWithHomeIndicator = () => DeviceInfo.hasNotch()

export default isIphoneWithHomeIndicator
