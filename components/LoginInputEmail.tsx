import { TextInput, StyleSheet } from "react-native";
import { useState } from "react";

export default function LoginInputEmail() {
    const [email, setEmail] = useState("");

    return (
        <TextInput style={styles.input} placeholder="Login (admin@gmail.com)" onChangeText={setEmail}/>
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