import smallDevicebreakpointHeight from '@/constants/dimensions/smallDevicebreakpointHeight';
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const isScreenSmall = () => {
  return height < smallDevicebreakpointHeight;
};

export default isScreenSmall;
