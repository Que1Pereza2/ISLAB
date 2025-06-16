import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { Hour } from "@/types/hour.type";
import {
  SQLiteDatabase,
  SQLiteProvider,
  useSQLiteContext,
  openDatabaseSync,
} from "expo-sqlite";
import { ReadHours } from "../database";

/* 
  TODO: This class needs to pull from the database the hours worked this month
and the taxes that apply to each one of them, after that it needs to calculate 
raw income, the net income and the taxed amount.
 */

export default function Index() {
  const db = useSQLiteContext();
  const [hours, setHours] = useState<Hour[]>([]);
  const [wage, setWage] = useState(0);

  const fetchHours = useCallback(() => {
    try {
      ReadHours(db)
        .then((results) => {
          console.log(results);
          setHours(results);
        })
        .catch((err) => {
          console.error("Database error:", err);
        });
    } catch (err) {
      console.log(err);
    }
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      fetchHours();
    }, [fetchHours])
  );

  const renderItem = ({ item }: { item: Hour }) => (
    <View>
      <Text style={styles.list}>
        {item.Value}: {item.Variety}
        {calculateWage()}
      </Text>
    </View>
  );

  function calculateWage() {
    let sum = wage;
    hours.forEach((hour) => {
      sum = wage + hour.Value;
      // setWage(sum);
    });
    return sum;
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={hours}
        renderItem={renderItem}
        keyExtractor={(item) => item.ID.toString()}
      />
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
});
