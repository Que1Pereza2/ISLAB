import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" key={3} options={{ headerShown: false }} />
    </Stack>
  );
}
