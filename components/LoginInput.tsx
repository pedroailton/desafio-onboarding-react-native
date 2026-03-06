import { TextInput, StyleSheet } from "react-native";

interface LoginInputProps {
    placeholder: string;
    secureTextEntry?: boolean;
    value: string;
    onChangeText: (text: string) => void;
}

export default function LoginInput({ placeholder, secureTextEntry, value, onChangeText }: LoginInputProps) {
    return (
        <TextInput style={styles.input} placeholder={placeholder} secureTextEntry={secureTextEntry} value={value} onChangeText={onChangeText}/>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "80%",
        height: 50,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        padding: 15,
    },
})