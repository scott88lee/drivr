import { View, Text } from "react-native";

export default function TextView(props) {
    return (
        <View>
            <Text>{props.name}</Text>
        </View>
    );
}
