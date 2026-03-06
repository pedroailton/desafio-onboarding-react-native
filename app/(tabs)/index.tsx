import { ScrollView, Text, View, ImageBackground, StyleSheet } from "react-native";

export default function Home() {
    return (
        <ScrollView>
            <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop" }} style={styles.background}>
                <Text style={styles.title}>Bem Vindo ao CookBuddy</Text>
                <Text style={styles.subtitle}>Seu parceiro de cozinha por voz</Text>
                <Text style={styles.contentText}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint dolorum eaque impedit soluta nesciunt non blanditiis minus officia. Aperiam fugiat blanditiis sed laboriosam cupiditate alias aliquid quas exercitationem non amet.</Text>
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