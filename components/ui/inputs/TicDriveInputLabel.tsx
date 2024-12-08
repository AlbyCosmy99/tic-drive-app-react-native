import { Text, View } from "react-native"
import TicDriveInput from "./TicDriveInput"

interface TicDriveInputLabelProps {
    label: string;
    placeholder: string;
    value?: string;
    onChange?: (value: string) => void;
}

const TicDriveInputLabel:React.FC<TicDriveInputLabelProps> = ({label, placeholder, value, onChange}) => {
    return (
        <View>
            <Text className="text-sm font-medium mx-2.5 text-tic">{label}</Text>
            <TicDriveInput 
                customValue={value} 
                onChange={onChange}
                inputContainerStyle={{marginTop: 10}} 
                placeholder={placeholder}
            />
        </View>
    )
}

export default TicDriveInputLabel