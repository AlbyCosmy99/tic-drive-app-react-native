import {Colors} from '@/constants/Colors';
import {LinearGradient} from 'expo-linear-gradient';

interface LinearGradientViewLayoutProps {
  children: React.ReactElement;
}

const LinearGradientViewLayout: React.FC<LinearGradientViewLayoutProps> = ({
  children,
}) => {
  return (
    <LinearGradient
      colors={[
        Colors.light.backgroundLinearGradient.start,
        Colors.light.backgroundLinearGradient.end,
      ]}
      className="flex-1 w-full h-full"
    >
      {children}
    </LinearGradient>
  );
};

export default LinearGradientViewLayout;
