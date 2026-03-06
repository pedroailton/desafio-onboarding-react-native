import { ScrollView, View, TouchableOpacity, StyleSheet, Image, Text, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";

export default function LoginScreen() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    // Ativado quando o botão é pressionado
    function handleLogin(){
        if ((email == "admin@gmail.com") && (senha == "teste123")) {
            setTimeout(() => {router.replace("/(tabs)")}, 2000);
        }
        else if (!email || !senha) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.", [ { text: "Entendi" } ]);
            return;
        }
        else {
            Alert.alert("Erro", "Email ou Senha incorretos. Tente novamente.", [ { text: "Entendi" } ])
            return
        }
        return
    }

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
                    <TextInput style={styles.input} placeholder="Login (admin@gmail.com)" onChangeText={setEmail}/>
                    <TextInput style={styles.input} placeholder="Senha (teste123)" onChangeText={setSenha} secureTextEntry={true}/>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        {isLoading ? (
                            <ActivityIndicator size={"small"} color={"#FFFFFF"}/>
                        ) : (
                            <Text style={styles.buttonText}>Entrar</Text>
                        )}
                    </TouchableOpacity>
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

    input: {
        width: "80%",
        height: 50,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        padding: 15,
    },

    button: {
        width: "80%",
        height: 50,
        backgroundColor: "#432534",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },

    buttonText: {
        textAlign: "center",
        color: "#FFFFFF",
    },
})