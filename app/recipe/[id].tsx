import { ActivityIndicator, ScrollView, Text, View, Image, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RecipeDetailsProps {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    [key: string]: any;
}

export default function RecipeDetails() {
    const [recipe, setRecipe] = useState<RecipeDetailsProps | null >(null);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useLocalSearchParams()

    useEffect(() => {
        async function getRecipeDetails() {
            setIsLoading(true)
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            const data = await response.json()
            // data é um array de apenas um objeto, a refeição requisitada por ID
            setRecipe(data.meals[0]);
            setIsLoading(false)
        }

        getRecipeDetails()
    }, [])

    // Tratamento de dados da API
    const ingredients = [];
    if (recipe) {
        for (let i = 1; i<=20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== "") {
                ingredients.push({
                    id: i,
                    name: ingredient,
                    measure: measure ? measure.trim() : ""
                });
            }
        }
    }

    async function handleSaveRecipe() {
        try{
            const savedRecipes = await AsyncStorage.getItem("@cookbuddy_saved");

            let currentSaved = savedRecipes ? JSON.parse(savedRecipes) : [];

            const isAlreadySaved = currentSaved.some((item: any) => item.idMeal === recipe?.idMeal)
             
            if (isAlreadySaved) {
                Alert.alert("Essa receita já está salva!")
                return
            }

            currentSaved.push(recipe)

            await AsyncStorage.setItem("@cookbuddy_saved", JSON.stringify(currentSaved))
            Alert.alert("Receita salva com sucesso!")
        } catch (error) {
            console.error("Erro ao salvar receita: ", error)
            Alert.alert("Não foi possível salvar a receita.")
        }
    }

    return(
        <View style={styles.container}>
            {isLoading ? 
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={"large"}/>
                </View> :
                !recipe ? 
                    <Text>Receita Não encontrada</Text> :
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <Image style={styles.image} source={{uri: recipe.strMealThumb}}/>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{recipe.strMeal}</Text>
                            <TouchableOpacity style={styles.savingButton} onPress={handleSaveRecipe}>
                                <Text style={styles.savingText}>Salvar receita</Text>
                            </TouchableOpacity>
                            <Text style={styles.subtitle}>Ingredientes</Text>

                            <View style={styles.divider}></View>

                            {ingredients.map((item) => (
                                <View key={item.id} style={styles.ingredientRow}>
                                    <Text style={styles.ingredientName}>{item.name}</Text>
                                    <Text style={styles.ingredientMeasure}>{item.measure}</Text>
                                </View>
                            ))}

                            <View style={styles.divider}></View>

                            <Text style={styles.subtitle}>Modo de Preparo</Text>
                            <Text style={styles.instructionText}>
                                {recipe.strInstructions}
                            </Text>
                        </View>
                    </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    loadingContainer: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },

    contentContainer: {
        flexGrow: 1,
        alignItems: "center",
    },

    image: {
        height: 300,
        width: "100%"
    },

    textContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: "#d87a21",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 10,
        paddingBottom: 20,
    },

    title: {
        fontSize: 32,
        marginTop: 10,
        color: "#ffffff",
        fontWeight: 700,
    },

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
        fontSize: 18,
    },

    subtitle: {
        fontSize: 24,
    },

    divider: {
        height: 1,
        backgroundColor: "#000000",
        width: "100%",
        marginVertical: 20,

    },

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

    },

    instructionText: {
        textAlign: "justify"
    }
})