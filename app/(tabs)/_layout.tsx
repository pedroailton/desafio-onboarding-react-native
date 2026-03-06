import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name="index" options={{ title: "Início",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        )
      }}>
      </Tabs.Screen>

      <Tabs.Screen name="recipes" options={{ title: "Receitas",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="restaurant" color={color} size={size} />
        )
      }}>
      </Tabs.Screen>
      
      <Tabs.Screen name="saved"
      options={{ title: "Salvo",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="bookmark" color={color} size={size} />
        )
      }}> 
      </Tabs.Screen>
    </Tabs>
  )
}