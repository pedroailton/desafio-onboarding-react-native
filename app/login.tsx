import { ScrollView, View, StyleSheet, Image, Text, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import LoginButton from "@/components/LoginButton";
import LoginInput from "@/components/LoginInput";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.select({ ios: "padding", android: "height" })}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <Image style={styles.image} source={require("../assets/images/logo.png")}/>
                    <Text style={styles.title}>LOGIN</Text>
                    <LoginInput placeholder="Login (admin@gmail.com)" value={email} onChangeText={setEmail} />
                    <LoginInput placeholder="Senha (teste123)" secureTextEntry={true} value={senha} onChangeText={setSenha} />
                    <LoginButton email={email} senha={senha} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#d87a21',
        gap: 25,
    },

    image: {
        width: 200,
        height: 200,
    },

    title: {
        fontSize: 32,
        fontWeight: 800,
        color: "#FFFFFF",
    },
})