import { ScrollView, Text, View, ImageBackground, StyleSheet } from "react-native";

export default function Home() {
    return (
        <ScrollView>
            <ImageBackground source={require("@/assets/images/bg-home.png")} style={styles.background}>
                <Text style={styles.title}>Bem Vindo ao CookBuddy</Text>
                <Text style={styles.subtitle}>Seu parceiro de cozinha por voz</Text>
                <Text style={styles.contentText}>Transforme sua rotina na cozinha com o CookBuddy. Descubra milhares de pratos deliciosos e prepare-se para uma experiência culinária totalmente nova. Mais do que um simples catálogo de receitas, o seu novo assistente inteligente está aqui para guiar você, de forma prática e interativa, em cada passo do preparo.</Text>
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        height: 800,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
    },

    title: {
        fontSize: 42,
        fontWeight: 900,
        color: "#FFFFFF",
        textAlign: 'center'
    },

    subtitle: {
        fontSize: 32,
        fontWeight: 400,
        color: "#FFFFFF",
        textAlign: 'center'
    },

    contentText: {
        fontSize: 18,
        fontWeight: 400,
        color: "#FFFFFF",
        textAlign: 'center'
    }
})