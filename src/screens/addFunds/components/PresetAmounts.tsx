import React from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "./stylesPreset";

type Props = {
    presets: number[];
    selected: number | null;
    onSelect: (value: number) => void;
};

export default function PresetAmounts({ presets, selected, onSelect }: Props) {
    return (
        <View style={styles.grid}>
            {presets.map((value) => {
                const isSelected = selected === value;

                return (
                    <Pressable
                        key={value}
                        style={[styles.button, isSelected && styles.selected]}
                        onPress={() => onSelect(value)}
                    >
                        <Text style={[styles.text, isSelected && styles.selectedText]}>
                            R$ {value},00
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}