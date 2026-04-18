import { Text } from 'react-native';
import { colors } from '../../constants/colors';

type Props = {
  title?: string;
  size?: number;
  color?: string;
  marginBottom?: number;
  fontWeight?: "bold" | "100" | "200" | "300" | "400" | "500" | "600";
  marginTop?: number;
};

export default function Title({ title, size = 24, color = colors.text, marginBottom = 0, fontWeight = 'bold', marginTop}: Props) {
  return (
    <Text
      style={{
        fontSize: size,
        color: color,
        fontFamily: 'Arial-BoldMT',
        marginBottom: marginBottom,
        fontWeight: fontWeight,
        marginTop: marginTop,
      }}
    >
      {title}
    </Text>
  ); 
}
