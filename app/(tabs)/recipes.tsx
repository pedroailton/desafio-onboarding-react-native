import { Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RecipeCard from "@/components/RecipeCard"

export interface RecipeProps{
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

export interface ApiResponse {
    meals: RecipeProps[];
}

export default function Recipes() {
    const [meals, setMeals] = useState<RecipeProps[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getMeals() {
            // Começa carregamento
            setIsLoading(true)

            const response = (await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="))
            const data = await response.json() as ApiResponse
            setMeals(data.meals)

            // Carregamento finalizado
            setIsLoading(false)
        }
        getMeals()
    }, [])

    return(
        <SafeAreaView style={styles.container}>
            {isLoading ?
                (<ActivityIndicator/>) :
                (<FlatList
                    ListHeaderComponent={<Text style={styles.header}>O que vamos cozinhar hoje?</Text>}
                    data={meals}
                    keyExtractor={(item) => item.idMeal}
                    renderItem={({ item }) => <RecipeCard recipe={item}/>}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between"}}/>
                )
            } 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#d87a21",
    },
    
    header: {
        fontSize: 24,
        fontWeight: 800,
        color: "#ffffff",
        textAlign: "center",
        marginTop: 8,
    },
})