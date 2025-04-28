import {Text, View} from 'react-native';
import CrossPlatformButtonLayout from '../ui/buttons/CrossPlatformButtonLayout';
import navigationPush from '@/services/navigation/push';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import {
  setLastWorkshopSelectedFromFilter,
  setSelectedWorkshop,
} from '@/stateManagement/redux/slices/workshopsSlice';
import ClockIcon from '@/assets/svg/time/clock.svg';

interface FilterSearchModalProps {
  elements: any[];
  idToCompareForClock?: number;
  emptyElementsMessage?: string;
  onElementPress: (elem: any) => void;
}

const FilterSearchModal: React.FC<FilterSearchModalProps> = ({
  elements,
  idToCompareForClock,
  emptyElementsMessage = 'No elements with this filter.',
  onElementPress,
}) => {
  const dispatch = useAppDispatch();
  const navigation = useTicDriveNavigation();
  return (
    <View className="absolute top-[60px] bg-white w-full z-10 p-2">
      <View className="p-2 rounded-xl bg-white shadow-lg mx-1.5">
        {elements.length > 0 ? (
          <View className="mb-1">
            {elements.map(elem => (
              <CrossPlatformButtonLayout
                key={elem.id}
                onPress={() => onElementPress(elem)}
              >
                <View className="flex flex-row justify-between items-center mx-2.5">
                  <Text className="mt-1 font-normal text-xl p-1 px-2.5 text-tic">
                    {elem.name ? elem.name : elem.title ? elem.title : ''}
                  </Text>
                  {idToCompareForClock && idToCompareForClock === elem.id && (
                    <ClockIcon />
                  )}
                </View>
              </CrossPlatformButtonLayout>
            ))}
          </View>
        ) : (
          <Text className="text-center mt-1 mb-2 font-normal text-xl">
            {emptyElementsMessage}
          </Text>
        )}
      </View>
    </View>
  );
};

export default FilterSearchModal;
