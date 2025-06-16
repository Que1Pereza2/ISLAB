import { Tabs } from "expo-router";

export default function Layout() {
  return (
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
