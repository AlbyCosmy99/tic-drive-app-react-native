import { Colors } from '@/constants/Colors';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import TicDriveInput from '../inputs/TicDriveInput';
import TicDriveDropdownData from '@/types/ui/dropdown/TicDriveDropdownData';
import { Text } from 'react-native';
import SvgFromUrl from '../svg/SvgFromUrl';

interface TicDriveDropdownProps {
  value?: TicDriveDropdownData;
  setValue: (value: any) => void;
  data: Array<TicDriveDropdownData>;
  placeholder: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  titleIsVisible?: boolean;
  title?: string;
}

const TicDriveDropdown: React.FC<TicDriveDropdownProps> = ({
  value,
  setValue,
  data,
  placeholder,
  searchPlaceholder = 'Search...',
  disabled = false,
  titleIsVisible = true,
  title = 'Select an option',
}) => {
  const [search, setSearch] = useState('');

  const filteredData = useMemo(
    () =>
      data.filter(item =>
        item.value.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, data],
  );

  return (
    <View className="flex justify-center px-3">
      {titleIsVisible && (
        <Text className="font-bold mt-2 mb-3 text-lg">{title}</Text>
      )}
      <Dropdown
        style={[
          {
            borderColor: disabled
              ? Colors.light.lightGrey
              : Colors.light.ticText,
          },
          styles.dropdown,
        ]}
        placeholderStyle={{
          color: disabled ? Colors.light.lightGrey : Colors.light.ticText,
        }}
        containerStyle={{ maxHeight: 230 }}
        data={filteredData}
        search
        disable={disabled}
        searchPlaceholder={searchPlaceholder}
        labelField="value"
        valueField="value"
        placeholder={!search ? placeholder : 'Searching...'}
        value={value}
        onChange={item => setValue(item)}
        renderInputSearch={props => (
          <TicDriveInput
            placeholder={searchPlaceholder + '...'}
            isRightIcon
            inputContainerStyle={{
              borderRadius: 0,
              padding: 0,
              height: 50,
              paddingHorizontal: 8,
              marginTop: 0,
            }}
            containerStyle={{
              paddingHorizontal: 0,
              height: 50,
            }}
            customValue={search}
            onChange={text => setSearch(text)}
          />
        )}
        renderItem={item => (
          <View
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              // backgroundColor: item.value === value?.value ? Colors.light.lightGrey : 'white',
              borderBottomWidth: 1,
              borderBottomColor: '#f0f0f0',
            }}
            className='flex flex-row justify-between items-center h-14'
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: item.value === value?.value ? '600' : '400',
                color: Colors.light.ticText,
              }}
            >
              {item.value}
            </Text>

            <View>
            {item.icon && (
              <SvgFromUrl
                url={item.icon}
                size={32}
              />
            )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    marginBottom: 20,
    height: 56,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default TicDriveDropdown;
