import { TextInput, StyleSheet } from "react-native";
import { useState } from "react";

export default function LoginInputPassword() {
    const [senha, setSenha] = useState("");

    return (
        <TextInput style={styles.input} placeholder="Senha (teste123)" secureTextEntry={true}/>
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