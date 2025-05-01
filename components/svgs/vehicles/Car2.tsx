import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgCar2 = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      fill="#737373"
      d="M18.92 6.01C18.72 5.42 18.15 5 17.5 5h-11c-.65 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16.5C5.67 16.5 5 15.83 5 15s.67-1.5 1.5-1.5S8 14.17 8 15s-.67 1.5-1.5 1.5zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-12.03-5L6.5 7h11l1.53 4.5h-13.56z"
    />
  </Svg>
);

export default SvgCar2;
