import { StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { RecipeProps } from "@/app/(tabs)/recipes";
import { useRouter } from "expo-router";

export default function RecipeCard({recipe}: {recipe: RecipeProps}) {
    const router = useRouter();

    return (
        <TouchableOpacity style={styles.card} onPress={() => router.push(`../recipe/${recipe.idMeal}`)}>
            <Image source={ {uri: recipe.strMealThumb} } style={styles.image}/>
            <Text style={styles.title}>{recipe.strMeal}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: "45%",
        marginTop: 12,
        marginLeft: 8,
        marginRight: 8,
    },

    image: {
        width: "100%",
        height: 150,
        borderRadius: 8,
        borderWidth: 1.5,
        borderBlockColor: "#00000079",
    },

    title: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: 600,
        marginTop: 5,
    }
})