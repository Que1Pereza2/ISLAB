import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        key={1}
        options={{
          headerShown: false,
          title: "Miaw",
        }}
      />

      <Tabs.Screen
        name="about"
        key={2}
        options={{
          headerShown: false,
          title: "About Mew",
        }}
      />
    </Tabs>
  );
}
