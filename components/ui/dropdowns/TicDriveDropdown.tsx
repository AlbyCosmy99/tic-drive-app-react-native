import { Colors } from "@/constants/Colors";
import React, { useMemo, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native"
import { Dropdown } from "react-native-element-dropdown";
import TicDriveInput from "../inputs/TicDriveInput";

interface TicDriveDropdownProps {
    value: any;
    setValue: (value: any) => void;
    data: Array<any>;
    placeholder: string;
    searchPlaceholder?: string;
}

const TicDriveDropdown: React.FC<TicDriveDropdownProps> = ({value, setValue, data, placeholder, searchPlaceholder = "Search..."}) => {
    const [search, setSearch] = useState("")

    const filteredData = useMemo(
        () =>
            data.filter((item) =>
                item.label.toLowerCase().includes(search.toLowerCase())
            ),
        [search, data]
    );

    return (
        <View className="flex justify-center px-3">
            <Dropdown
                style={styles.dropdown}
                data={filteredData}
                search
                searchPlaceholder={searchPlaceholder}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                value={value}
                onChange={(item) => setValue(item.value)}
                renderInputSearch={(props) => (
                    <TicDriveInput
                        placeholder="Search car make..."
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
        borderColor: Colors.light.ticText,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    textInput: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
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
        textAlignVertical: "center",
    },
    

})

export default TicDriveDropdown