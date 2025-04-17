import { Text, View } from "react-native";

const SvgFromlink = () => {
  return (
    <View className="items-center my-4">
      <Text className="text-base font-semibold mb-2">
        trying the Nissan Logo from Azure
      </Text>
      <WebView
        originWhitelist={['*']}
        source={{
          html: `
              <html>
                <head>
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <style>
                    html, body {
                      margin: 0;
                      padding: 0;
                      background-color: transparent;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      height: 100vh;
                    }
                    object {
                      width: 100%;
                      height: 100%;
                    }
                  </style>
                </head>
                <body>
                  <object type="image/svg+xml" data="https://ticdrive.blob.core.windows.net/car-logos/nissan.svg"></object>
                </body>
              </html>
            `,
        }}
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'transparent',
        }}
        scrollEnabled={false}
      />
    </View>
  );
};
