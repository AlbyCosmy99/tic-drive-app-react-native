import {Text, View} from 'react-native';
import CrossPlatformButtonLayout from '../../buttons/CrossPlatformButtonLayout';
import BellIcon from '@/assets/svg/notifications/bell.svg';
interface TicDriveReminderCardProps {
  text: string;
  leftButtonText?: string;
  rightButtonText?: string;
  logo?: React.ReactNode;
}

const TicDriveReminderCard: React.FC<TicDriveReminderCardProps> = ({
  text,
  leftButtonText = 'Book now',
  rightButtonText = 'Remind me later',
  logo,
}) => {
  return (
    <View className="border-2 border-grey-light justify-center mx-2.5 my-0.5 rounded-xl bg-white flex-col p-2 pt-4 relative">
      <View className="absolute right-3 top-3">{logo}</View>
      <View className="mx-1 mr-8 mb-4">
        <Text className="text-sm font-medium">{text}</Text>
      </View>
      <View className="flex flex-row items-center">
        <CrossPlatformButtonLayout
          removeAllStyles
          containerTailwindCss="rounded-3xl flex-1 border p-1.5 mx-1 bg-drive border-drive"
          buttonTailwindCss="items-center"
        >
          <Text className="text-xs text-white font-bold">{leftButtonText}</Text>
        </CrossPlatformButtonLayout>
        <CrossPlatformButtonLayout
          removeAllStyles
          containerTailwindCss="rounded-3xl flex-1 border p-1.5 mx-0 border-tic"
          buttonTailwindCss="flex-row items-center gap-x-1 justify-center"
        >
          <Text className="text-xs text-tic font-bold">{rightButtonText}</Text>
          <BellIcon width={15} height={15} />
        </CrossPlatformButtonLayout>
      </View>
    </View>
  );
};

export default TicDriveReminderCard;
