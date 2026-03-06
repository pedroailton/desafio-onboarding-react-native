import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

interface Ingredient {
    id: number;
    name: string;
    measure: string;
}

export default function IngredientList({ ingredients }: { ingredients: Ingredient[] }) {
    return (
        <View>
            {ingredients.map((item) => (
                <View key={item.id} style={styles.ingredientRow}>
                    <Text style={styles.ingredientName}>{item.name}</Text>
                    <Text style={styles.ingredientMeasure}>{item.measure}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    ingredientRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 6,
        gap: 6,
    },

    ingredientName: {
        fontWeight: "bold",
    },

    ingredientMeasure: {
        fontStyle: "italic",
    }
})