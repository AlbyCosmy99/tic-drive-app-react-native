import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
const SvgMap = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="gray"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="map_svg__feather map_svg__feather-map-pin"
    {...props}
  >
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0" />
    <Circle cx={12} cy={10} r={3} />
  </Svg>
);
export default SvgMap;
