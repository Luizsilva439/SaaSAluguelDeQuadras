import { View, Image, Text } from 'react-native'
import { colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

type Props = {
    source?: string;
    height?: number;
    width?: number;
    image?: boolean;
}

export default function ProfileComponent( {source,image = false, height = 40, width = 40} : Props) {

    return (
        <View style={{
            height: height,
            width: width,
            backgroundColor: colors.gray,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            overflow: "hidden"
            
        }}>
            {image ? (
                <Ionicons name="person" size={28} color="black" />
            ) : (
                <Image
                source={source as any}
                style={{
                    flex: 1,
                    height: height,
                    width: width, 
                    borderRadius: 50
                }}
                resizeMode="cover"
                />
            )}
        </View>
    );
}