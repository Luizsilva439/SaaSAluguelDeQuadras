import { Text } from 'react-native';
import { colors } from '../../constants/colors';

type Props = {
  title?: string;
  size?: number;
  color?: string;
  marginBottom?: number;
};

export default function Title({ title, size = 24, color = colors.text, marginBottom = 0 }: Props) {
  return (
    <Text
      style={{
        fontSize: size,
        color: color,
        fontFamily: 'Arial-BoldMT',
        marginBottom: marginBottom,
        fontWeight: 'bold',
      }}
    >
      {title}
    </Text>
  ); 
}
