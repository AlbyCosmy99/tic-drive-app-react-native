import {Colors} from '@/constants/Colors';
import React, {useMemo, useState, useCallback} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import TicDriveInput from '../inputs/TicDriveInput';
import TicDriveDropdownData from '@/types/ui/dropdown/TicDriveDropdownData';
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

const DropdownItem = React.memo(
  ({item, selected}: {item: TicDriveDropdownData; selected: boolean}) => (
    <View
      style={[
        styles.itemContainer,
        {backgroundColor: selected ? Colors.light.lightGrey : 'white'},
      ]}
      className="flex flex-row justify-between items-center h-14"
    >
      <Text style={[styles.itemText, {fontWeight: selected ? '600' : '400'}]}>
        {item.label}
      </Text>
    </View>
  ),
);

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

  const renderDropdownItem = useCallback(
    (item: TicDriveDropdownData) => (
      <DropdownItem
        key={item.value}
        item={item}
        selected={item.value === value?.value}
      />
    ),
    [value],
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
        containerStyle={{maxHeight: 230}}
        data={filteredData}
        search
        disable={disabled}
        searchPlaceholder={searchPlaceholder}
        labelField="label"
        valueField="value"
        placeholder={!search ? placeholder : 'Searching...'}
        value={value}
        onChange={item => setValue(item)}
        renderInputSearch={props => (
          <TicDriveInput
            placeholder={searchPlaceholder + '...'}
            existsRightIcon
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
        renderItem={renderDropdownItem}
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    height: 56,
  },
  itemText: {
    fontSize: 16,
    color: Colors.light.ticText,
  },
});

export default TicDriveDropdown;
