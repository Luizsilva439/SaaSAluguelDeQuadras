import { Pressable } from "react-native";
import { Text } from "react-native";
import { colors } from "../../constants/colors";

type Props = {
    title?: string;
    onPress?: () => void;
    size?: number;
    color?: string;
}

export default function TextLink({ title, onPress, size = 14, color = colors.tertiary }: Props) {
    return (
        <Pressable onPress={onPress}>
            <Text style={{
                color: color,
                fontSize: size,
            }}>
                {title}
            </Text>
        </Pressable>
    );
}