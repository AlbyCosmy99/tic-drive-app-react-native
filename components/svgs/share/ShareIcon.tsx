import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgShareIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={23}
    fill="none"
    {...props}
  >
    <Path
      fill="#5F6368"
      fillOpacity={0.89}
      d="M2.282 22.17a1.91 1.91 0 0 1-1.401-.58 1.9 1.9 0 0 1-.583-1.398V9.307q0-.816.583-1.398a1.91 1.91 0 0 1 1.401-.58H5.26v1.978H2.282v10.885h11.909V9.307h-2.977V7.328h2.977q.819 0 1.402.581.583.582.583 1.398v10.885q0 .816-.583 1.397a1.91 1.91 0 0 1-1.402.582zm4.962-6.926V4.186L5.657 5.77l-1.39-1.41L8.237.402l3.97 3.958-1.39 1.41-1.588-1.584v11.058z"
    />
  </Svg>
);
export default SvgShareIcon;
