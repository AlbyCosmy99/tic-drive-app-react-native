import doesDeviceNeedsBottomInset from "./doesDeviceNeedsBottomInset"

const necessaryDeviceBottomInset = () => {
    //tailwind css
    return doesDeviceNeedsBottomInset() ? "mb-4" : ''
}

export default necessaryDeviceBottomInset