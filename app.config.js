const isDev = process.env.APP_VARIANT === 'development';

export default {
  expo: {
    name: isDev ? 'TicDrive Dev' : 'TicDrive',
    slug: 'tic-drive',
    version: '1.1.5',
    orientation: 'portrait',
    icon: './assets/images/png/ticDriveLogo.png',
    scheme: 'ticdrive',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/png/ticDriveSplash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      buildNumber: '1',
      supportsTablet: true,
      bundleIdentifier: isDev ? 'com.ticdrive.ios.dev' : 'com.ticdrive.ios',
      associatedDomains: ['applinks:ticdrive.com'],
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        NSLocationWhenInUseUsageDescription:
          'This app requires access to your location to show nearby workshops.',
        NSLocationAlwaysUsageDescription:
          'This app requires background location access to enhance the user experience and show nearby workshops.',
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true,
          NSExceptionDomains: {
            'static.36.245.90.157.clients.your-server.de': {
              NSIncludesSubdomains: true,
              NSTemporaryExceptionAllowsInsecureHTTPLoads: true,
              NSTemporaryExceptionMinimumTLSVersion: 'TLSv1.1',
            },
            localhost: {
              NSIncludesSubdomains: true,
              NSTemporaryExceptionAllowsInsecureHTTPLoads: true,
              NSTemporaryExceptionMinimumTLSVersion: 'TLSv1.1',
            },
          },
        },
      },
      config: {
        googleMapsApiKey: 'AIzaSyA4RElAzKK4A46CGKArVpOW5fXoTRLKAso',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/png/ticDriveLogo.png',
        backgroundColor: '#ffffff',
      },
      package: isDev ? 'com.ticdrive.app.dev' : 'com.ticdrive.app',
      versionCode: 9,
      intentFilters: [
        {
          action: 'VIEW',
          data: {
            scheme: 'ticdrive',
            host: '*',
          },
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
      config: {
        googleMaps: {
          apiKey: 'AIzaSyA4RElAzKK4A46CGKArVpOW5fXoTRLKAso',
        },
      },
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/ticDriveLogo.png',
    },
    plugins: [
      'expo-router',
      'expo-secure-store',
      'expo-updates',
      'expo-font',
      'expo-localization',
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: '89391c4d-8326-47ff-b646-8624126e7001',
      },
    },
    runtimeVersion: '1.0.0',
    updates: {
      url: 'https://u.expo.dev/89391c4d-8326-47ff-b646-8624126e7001',
      enabled: true,
      checkAutomatically: 'ON_LOAD',
      fallbackToCacheTimeout: 0,
    },
    newArchEnabled: true,
  },
};
