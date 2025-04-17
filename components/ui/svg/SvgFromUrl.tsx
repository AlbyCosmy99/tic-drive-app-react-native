import {Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

interface SvgFromUrlProps {
  url: string;
  size?: number;
}

const SvgFromUrl: React.FC<SvgFromUrlProps> = ({url, size = 150}) => {
  return (
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
                <object type="image/svg+xml" data="${url}"></object>
              </body>
            </html>
          `,
      }}
      style={{
        width: size,
        height: size,
        backgroundColor: 'transparent',
      }}
      scrollEnabled={false}
    />
  );
};

export default SvgFromUrl;
