import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SQLiteProvider } from "expo-sqlite";
export default function TabLayout() {
  return (
    // SQLite provider sets up the database that will be used troughout the app.
    <SQLiteProvider
      databaseName="hours.db"
      assetSource={{ assetId: require("./database/Miau.db") }}
    >
      {/* The setup for the tabs at the bottom of the app */}
      <Stack>
        <Stack.Screen name="(tabs)" key={3} options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "royalblue",
  },
  text: {
    color: "white",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "yellow",
  },
  todoItemContainer: {},
  headerContainer: {},
  contentContainer: {},
  headerText: {},
});
