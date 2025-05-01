const {getDefaultConfig} = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// If you're no longer importing raw `.svg` files but instead using `.tsx` components,
// you don't need to customize transformer/resolver at all.
// This keeps the config compatible with Expo SDK 53.

module.exports = config;
