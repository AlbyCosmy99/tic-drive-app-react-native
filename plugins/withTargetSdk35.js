const { withAppBuildGradle } = require('@expo/config-plugins');

module.exports = function withTargetSdk35(config) {
  return withAppBuildGradle(config, (config) => {
    config.modResults.contents = config.modResults.contents.replace(
      /targetSdkVersion = \d+/,
      'targetSdkVersion = 35'
    );
    return config;
  });
};
