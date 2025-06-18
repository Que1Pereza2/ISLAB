import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { DeleteDay, ReadDay } from "../database";
import { Day } from "@/types/day.type";

// This is the screen that appears when the app starts, it shows a monthly
// overview of the current month
export default function Index() {
  // Expo hooks
  const db = useSQLiteContext();
  const [days, setDays] = useState<Day[]>([]);
  const [today] = useState(new Date());

  // This function here makes the date more pleasing to read
  let month = "0";
  if (today.getMonth() < 9) month = "0" + (today.getMonth() + 1);
  else month = today.getMonth().toString();

  // The year that the app will search for in the database
  const year = today.getFullYear();

  // This function reads all the days from the database that match the current
  //  month and year
  const fetchHours = useCallback(() => {
    const todayDate = today.toISOString().split("T");
    try {
      ReadDay(db, todayDate[0])
        .then((results) => {
          console.log(results);
          setDays(results);
        })
        .catch((err) => {
          console.error("Database error:", err);
        });
    } catch (err) {
      console.log(err);
    }
  }, [db]);

  // This funtion is executed when the tab is selected to be shown and calls
  // the funtion that pulls the days from the database
  useFocusEffect(
    useCallback(() => {
      fetchHours();
    }, [db])
  );

  // This function deletes all the days from the database and refreshes
  // the days list
  const deleteDays = () => {
    DeleteDay(db);
    fetchHours();
  };

  // this constant calculates money earned troughout the month
  const monthlySummary = days.reduce(
    (summary, day) => ({
      gross: summary.gross + day.dayTotal,
      net: summary.net + day.dayTotalAfterTax,
      taxed: summary.taxed + (day.dayTotal - day.dayTotalAfterTax),
    }),
    { gross: 0, net: 0, taxed: 0 }
  );

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>
          Monthly Summary ({month}/{year})
        </Text>
        <Text style={styles.summaryText}>
          Net Income: {monthlySummary.net.toFixed(2)}€
        </Text>
        <Text style={styles.summaryText}>
          Taxes Paid: {monthlySummary.taxed.toFixed(2)}€
        </Text>
        <Text style={styles.summaryText}>
          Gross Income: {monthlySummary.gross.toFixed(2)}€
        </Text>
      </View>

      <TouchableOpacity style={styles.summaryContainer} onPress={deleteDays}>
        <Text style={styles.summaryText}>Delete Days</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    borderColor: "black",
    borderStyle: "dotted",
  },
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
  summaryContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    marginVertical: 4,
  },
  dayItem: {
    backgroundColor: "white",
    padding: 12,
    marginBottom: 8,
    borderRadius: 4,
  },
});
