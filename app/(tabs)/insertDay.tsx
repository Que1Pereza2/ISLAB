import { Hour } from "@/types/hour.type";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { CreateDay, ReadHours } from "../database";
import HourField from "@/components/hourField";
import { CalendarPicker } from "@/components/calendarPicker";
import { useSQLiteContext } from "expo-sqlite";
import { useFocusEffect } from "expo-router";

type HourEntry = {
  id: number;
  count: number;
  dayTotal: number;
  dayTotalAfterTax: number;
  hourType: Hour;
};

export default function InsertDay() {
  const db = useSQLiteContext();
  const [hourEntries, setHourEntries] = useState<HourEntry[]>([]);
  const [currentDay, setCurrentDay] = useState("");
  const [hourArray, setHourArray] = useState<Hour[]>([]);

  useEffect(() => {
    if (!currentDay) {
      setCurrentDay(new Date().toISOString().split("T")[0]);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      try {
        ReadHours(db).then((hours) => {
          setHourArray(hours);
        });
      } catch (error) {
        console.log(error);
      }
    }, [db])
  );

  const generateHourFiels = () => {
    if (hourArray.length === 0) {
      alert("Load hour types first!");
      return;
    }
    const newEntry: HourEntry = {
      id: Date.now(),
      count: 0,
      dayTotal: 0,
      dayTotalAfterTax: 0,
      hourType: hourArray[0],
    };
    setHourEntries([...hourEntries, newEntry]);
  };

  const removeHourFields = () => {
    setHourEntries([]);
  };

  const dateUpdate = useCallback((date: string) => {
    setCurrentDay(date);
  }, []);

  const dayUpdate = (data: {
    id: number;
    count: number;
    dayTotal: number;
    dayTotalAfterTax: number;
    selectedHour: Hour;
  }) => {
    setHourEntries((prev) =>
      prev.map((entry) =>
        entry.id === data.id
          ? { ...entry, ...data, hourType: data.selectedHour }
          : entry
      )
    );
  };

  const insertAllEntries = async () => {
    if (!currentDay || hourEntries.length === 0) return;

    await Promise.all(
      hourEntries.map((entry) =>
        CreateDay(
          db,
          currentDay,
          entry.count,
          entry.dayTotal,
          entry.dayTotalAfterTax,
          entry.hourType.ID
        )
      )
    );
    console.log("All entries saved!");
  };

  const renderItem = ({ item }: { item: HourEntry }) => {
    return (
      <HourField key={item.id} id={item.id} hour={hourArray} day={dayUpdate} />
    );
  };
  return (
    <View style={styles.container}>
      <CalendarPicker onUpdate={dateUpdate} selectedDay={currentDay} />

      <FlatList
        data={hourEntries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 7 }}
        ItemSeparatorComponent={() => <View style={{ height: 7 }} />}
      ></FlatList>
      <TouchableOpacity
        onPress={generateHourFiels}
        style={styles.utilityButton}
      >
        <Text style={styles.buttonText}>Add Hour Field</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={removeHourFields} style={styles.utilityButton}>
        <Text style={styles.buttonText}>Clear All</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={insertAllEntries} style={styles.utilityButton}>
        <Text style={styles.buttonText}>Save All Entries</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "royalblue",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  utilityButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    color: "white",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "yellow",
  },
});
