import doesDeviceNeedsBottomInset from './doesDeviceNeedsBottomInset';

const necessaryDeviceBottomInset = () => {
  return doesDeviceNeedsBottomInset() ? 'py-4 pt-0' : '';
};

export default necessaryDeviceBottomInset;
