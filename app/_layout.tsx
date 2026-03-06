import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name="login" options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name="(tabs)" options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name="recipe/[id]" options={{title: 'Detalhes da Receita'}}></Stack.Screen>
    </Stack>
  )
}