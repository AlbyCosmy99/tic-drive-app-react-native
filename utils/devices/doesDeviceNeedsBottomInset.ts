import isAndroidPlatform from './isAndroidPlatform';
import isIphoneWithHomeIndicator from './isIphoneWithHomeIndicator';

const doesDeviceNeedsBottomInset = () => {
  return isAndroidPlatform() || !isIphoneWithHomeIndicator();
};

export default doesDeviceNeedsBottomInset;
