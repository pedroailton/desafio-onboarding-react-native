import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#d87a21",
        tabBarStyle: {
          height: 65,
          paddingTop: 6,
          paddingBottom: 8,
          backgroundColor: "#fff",
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="recipes"
        options={{
          title: "Receitas",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "restaurant" : "restaurant-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: "Salvos",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}