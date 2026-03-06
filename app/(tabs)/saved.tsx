import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecipeCard from '@/components/RecipeCard';
import { RecipeProps } from './recipes';

export default function Saved() {
    const [savedRecipesList, setSavedRecipesList] = useState<RecipeProps[]>([])

    useFocusEffect(useCallback(() => {
        async function loadSavedRecipes() {
            const savedRecipes = await AsyncStorage.getItem("@cookbuddy_saved");

            if (savedRecipes) {
                const parsedSavedRecipes = JSON.parse(savedRecipes)

                setSavedRecipesList(parsedSavedRecipes)
            }
        }

        loadSavedRecipes()
    }, []))

    return(
        <SafeAreaView style={styles.container}>
            {savedRecipesList.length === 0 ? (
                <View>
                    <Text style={styles.warningText}>Você ainda não tem receitas salvas.</Text>
                </View>) : (
                <FlatList
                    ListHeaderComponent={<Text style={styles.header}>Receitas Salvas</Text>}
                    data={savedRecipesList}
                    keyExtractor={(item) => item.idMeal}
                    renderItem={({ item }) => <RecipeCard recipe={item}/>}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between"}}
                />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    warningText: {

    },

    container: {
        flex: 1,
        backgroundColor: "#d87a21"
    },

    grid: {

    },

    header: {
        fontSize: 24,
        fontWeight: 800,
        color: "#ffffff",
        textAlign: "center",
        marginTop: 8,
    },
})