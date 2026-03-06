import { ActivityIndicator, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

interface LoginButtonProps {
    email: string;
    senha: string;
}

export default function LoginButton({email, senha}: LoginButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    // Ativado quando o botão é pressionado
    function handleLogin(){
        if (!email || !senha) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.", [ { text: "Entendi" } ]);
            return;
        }

        else if ((email == "admin@gmail.com") && (senha == "teste123")) {
            setIsLoading(true)

            setTimeout(() => {
                router.replace("/(tabs)")
                setIsLoading(false)
            }, 2000);
            return
        }

        else {
            Alert.alert("Erro", "Email ou Senha incorretos. Tente novamente.", [ { text: "Entendi" } ])
            return
        }
    }
    
    return (
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
            {isLoading ? (
                <ActivityIndicator size={"small"} color={"#FFFFFF"}/>
            ) : (
                <Text style={styles.buttonText}>Entrar</Text>
            )}
        </TouchableOpacity>
        );
}

const styles = StyleSheet.create({
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
