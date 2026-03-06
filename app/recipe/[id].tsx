import { ActivityIndicator, ScrollView, Text, View, Image, StyleSheet, Alert, useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SavingButton from "@/components/SavingButton";
import IngredientList from "@/components/IngredientList";
import { scaleFont } from "@/app/utils/utils";

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
    const [recipeAlreadySaved, setRecipeAlreadySaved] = useState(false); 

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

        getRecipeDetails();
    }, [id])

    useEffect(() => {
        async function checkIfRecipeAlreadySaved() {
            const savedRecipes = await AsyncStorage.getItem("@cookbuddy_saved");
            const parsedSavedRecipes = savedRecipes ? JSON.parse(savedRecipes) : [];
            const isAlreadySaved = parsedSavedRecipes.some((item: any) => item.idMeal === recipe?.idMeal);
            setRecipeAlreadySaved(isAlreadySaved);
        }

        checkIfRecipeAlreadySaved();
    }, [recipe])

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
                            <SavingButton recipeAlreadySaved={recipeAlreadySaved} handleSaveRecipe={handleSaveRecipe} />
                            <Text style={styles.subtitle}>Ingredientes</Text>

                            <View style={styles.divider}></View>

                            <IngredientList ingredients={ingredients} />

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

const { width } = useWindowDimensions()

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
        height: width * 0.7,
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
        fontSize: scaleFont(32),
        marginTop: 10,
        color: "#ffffff",
        fontWeight: 700,
    },

    subtitle: {
        fontSize: scaleFont(24),
    },

    divider: {
        height: 1,
        backgroundColor: "#000000",
        width: "100%",
        marginVertical: 20,

    },

    instructionText: {
        textAlign: "justify"
    }
})