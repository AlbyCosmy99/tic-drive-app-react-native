import smallDevicebreakpointHeight from '@/constants/smallDevicebreakpointHeight';
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const isScreenSmall = () => {
  return height < smallDevicebreakpointHeight;
};

export default isScreenSmall;
