import { Text, Pressable } from 'react-native';

//ToDo: find more appropriate type for the styles prop
interface CustomizableButtonProps {
    onPress: () => void,
    title: string,
    stylesButton?: Record<string, string | number>,
    stylesText?: Record<string, string | number>,
    disabled?: boolean
}

export const CustomizableButton = ({ onPress, title, stylesButton, stylesText, disabled = false }: CustomizableButtonProps) => <Pressable disabled={disabled} style={stylesButton} onPress={onPress}>
    <Text style={stylesText}>{title}</Text>
</Pressable>
