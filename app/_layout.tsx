import { Stack } from "expo-router";
import { Button } from "react-native";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" key={3} options={{ headerShown: false }} />
    </Stack>

    // <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
    //       <Tabs.Screen
    //         name="index"
    //         options={{
    //           headerShown: false,
    //           title: "Miaw",
    //         }}
    //       />

    //       <Tabs.Screen
    //         name="about"
    //         options={{
    //           headerShown: false,
    //           title: "About Mew",
    //         }}
    //       />
    //     </Tabs>

    //     options={{
    //       headerTitle: "Miaw",
    //       headerShown: false,
    //       // navigationBarHidden: true,
    //     }}
    //   />
    //   <Stack.Screen name="about" options={{ headerTitle: "AboutMew" }} />
    // </Stack>
  );
}
