import { Colors } from "@/constants/Colors";
import React, { useMemo, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native"
import { Dropdown } from "react-native-element-dropdown";
import TicDriveInput from "../inputs/TicDriveInput";
import TicDriveDropdownData from "@/types/ui/dropdown/TicDriveDropdownData";
import { Text } from "react-native";
interface TicDriveDropdownProps {
    value?: TicDriveDropdownData; //variable where to save the choosen value
    setValue: (value: any) => void; //function to update the choosen value
    data: Array<TicDriveDropdownData>;
    placeholder: string;
    searchPlaceholder?: string;
    disabled?: boolean;
    titleIsVisible?: boolean;
    title?: string;
}

const TicDriveDropdown: React.FC<TicDriveDropdownProps> = ({value, setValue, data, placeholder, searchPlaceholder = "Search...", disabled=false, titleIsVisible = true, title = 'Select an option'}) => {
    const [search, setSearch] = useState("")

    const filteredData = useMemo(
        () =>
            data.filter((item) =>
                item.value.toLowerCase().includes(search.toLowerCase())
            ),
        [search, data]
    );

    return (
        <View className="flex justify-center px-3">
            {titleIsVisible && <Text className="font-bold mt-2 mb-3 text-lg">{title}</Text>}
            <Dropdown
                style={[{borderColor: disabled ? Colors.light.lightGrey : Colors.light.ticText}, styles.dropdown]}
                placeholderStyle={{color: disabled ? Colors.light.lightGrey : Colors.light.ticText}}
                containerStyle={{maxHeight: 230}}
                data={filteredData}
                search
                disable={disabled}
                searchPlaceholder={searchPlaceholder}
                labelField="value"
                valueField="value"
                placeholder={!search ? placeholder : 'Searching...'}
                value={value}
                onChange={(item) => setValue(item)}
                renderInputSearch={(props) => (
                    <TicDriveInput
                        placeholder={searchPlaceholder + '...'}
                        isRightIcon
                        inputContainerStyle={{borderRadius: 0, padding: 0, height: 50, paddingHorizontal: 8, marginTop: 0}}
                        containerStyle={{paddingHorizontal: 0, height: 50,backgroundColor: 'red'}}
                        customValue={search}
                        onChange={(text) => setSearch(text)}
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        marginBottom: 20,
        height: 56,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10
    },
    textInput: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10
    },
    label: {
        marginBottom: 10,
        fontSize: 16,
    },
    searchInput: {
        height: 50,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#f9f9f9",
        color: "#333",
        textAlignVertical: "center"
    },
    

})

export default TicDriveDropdown