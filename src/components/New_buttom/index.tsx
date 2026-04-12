import {
  TouchableOpacity,
  Text, ActivityIndicator,
  GestureResponderEvent,
  View,
  Pressable
} from 'react-native';
import { colors } from '../../constants/colors';

type Props = {
  title?: string;
  color?: string;
  height?: number;
  colorText?: string;
  isLoading?: boolean;
  titleSize?: number;
  isClicked?: boolean;
  borderColor?: string;
  borderWidth?: number;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function New_buttom({
  titleSize = 16,
  title,
  color = colors.primary,
  height = 55,
  colorText = colors.background,
  isLoading = false,
  isClicked = false,
  borderColor = colors.primary,
  borderWidth = 0,
  onPress,
}: Props) {

  return (

    <View>{
      isClicked ? (
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: color,
            height: height,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderWidth: borderWidth,
            borderColor: borderColor,
          }}
          disabled={isLoading}
        >{
            isLoading ? (
              <ActivityIndicator color={colors.background} />
            ) : <Text style={{ color: colorText, fontSize: titleSize, fontWeight: 'bold' }}>{title}</Text>
          }
        </TouchableOpacity>
      ) : <Pressable

        
        style={{
          backgroundColor: colors.gray,
          height: height,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
        disabled={isLoading}
      >{
          isLoading ? (
            <ActivityIndicator color={colors.background} />
          ) : <Text style={{ color: colorText, fontSize: titleSize, fontWeight: 'bold' }}>{title}</Text>
        }
      </Pressable>
    }

    </View>

  );
}
