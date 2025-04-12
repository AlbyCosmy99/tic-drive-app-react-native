import doesDeviceNeedsBottomInset from './doesDeviceNeedsBottomInset';

const necessaryDeviceBottomInset = () => {
  return doesDeviceNeedsBottomInset() ? 'mb-4' : '';
};

export default necessaryDeviceBottomInset;
