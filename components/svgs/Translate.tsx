import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
const SvgTranslate = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    fill="gray"
    stroke="gray"
    viewBox="-34.56 -34.56 117.12 117.12"
    {...props}
  >
    <Circle
      cx={24}
      cy={24}
      r={21.5}
      style={{
        fill: 'none',
        stroke: '#000',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Path
      d="M30.692 44.432 17.308 3.568M22.429 36.637l-5.656-17.402L10.9 36.637M12.858 30.764h7.613M27.236 11.159c-.032 4.543-.26 11.617 5.16 17.328"
      style={{
        fill: 'none',
        stroke: '#000',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Path
      d="M22.924 13.996a38.6 38.6 0 0 0 15.41-1.734M23.785 23.345c2.586-4.394 13.61-7.906 14.55-.731a5.53 5.53 0 0 1-2.188 5.17"
      style={{
        fill: 'none',
        stroke: '#000',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Path
      d="M35.446 16.059c.169 5.193-6.115 13.58-10.115 12.011"
      style={{
        fill: 'none',
        stroke: '#000',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
  </Svg>
);
export default SvgTranslate;
