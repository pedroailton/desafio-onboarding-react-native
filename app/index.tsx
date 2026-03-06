// Splash Screen (tela de Carregamento)
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";

export default function SplashScreen() {
    const router = useRouter(); //Hook useRouter()

    // Temporizador de 2 segundos
    useEffect(() => {
        setTimeout(() => {router.replace("/login");}, 2000)
    }, []);


    return (
        <View style={styles.container}>
            <Image source={require("../assets/images/logo.png")} style={styles.image}/>
            <ActivityIndicator size={"large"} color={"#FFFFFF"} style={styles.animation}/>
            <Text style={styles.loadingText}>Preparando A Cozinha...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, /*View ocupa 100% da altura*/
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d87a21', /*Mudar depois */
    },

    image: {
        width: 250,
        height: 250,
        marginBottom: 10,
    },

    animation: {
        marginBottom: 10,
    },

    loadingText: {
        fontSize: 36,
        fontWeight: 700,
        color: "#FFFFFF",
        textAlign: 'center'
    },
})