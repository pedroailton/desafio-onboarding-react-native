import {Text, TouchableOpacity, StyleSheet } from "react-native";
import { scaleFont } from "@/app/utils/utils";


interface SavingButtonProps {
    recipeAlreadySaved: boolean;
    handleSaveRecipe: () => void;
}

export default function SavingButton({ recipeAlreadySaved, handleSaveRecipe }: SavingButtonProps) {
    return (
        <TouchableOpacity style={styles.savingButton} onPress={handleSaveRecipe}>
            {recipeAlreadySaved ?
            <Text style={styles.alreadySavingText}>Receita salva</Text> :
            <Text style={styles.savingText}>Salvar receita</Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
        savingButton: {
        backgroundColor: "#ad4a11",
        borderRadius: 10,
        borderWidth: 1,
        padding: 15,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    savingText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: scaleFont(18),
    },

    alreadySavingText: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: scaleFont(18),
    },
})