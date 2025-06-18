import { Tabs } from "expo-router";

export default function Layout() {
  return (
    // The second file where the app enters and sets up the tabs details that
    // are showed on the bottom side of the app
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        key={1}
        options={{
          headerShown: false,
          title: "Summary",
        }}
      />
      <Tabs.Screen
        name="insertDay"
        key={2}
        options={{
          headerShown: false,
          title: "Today",
        }}
      />
      <Tabs.Screen
        name="viewCalendar"
        key={3}
        options={{
          headerShown: false,
          title: "Calendar",
        }}
      />

      <Tabs.Screen
        name="insertHoursAndTax"
        key={4}
        options={{
          headerShown: false,
          title: "Hours and Tax",
        }}
      />
    </Tabs>
  );
}
