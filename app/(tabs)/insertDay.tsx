import { Hour } from "@/types/hour.type";
import { useCallback, useEffect, useState } from "react";
import {
  View,
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

// this type is the one used to define the hour field props
type HourEntry = {
  id: number;
  count: number;
  dayTotal: number;
  dayTotalAfterTax: number;
  hourType: Hour;
};

// this is the screen that shows insert day is selected
export default function InsertDay() {
  // react hooks
  const db = useSQLiteContext();
  const [hourEntries, setHourEntries] = useState<HourEntry[]>([]);
  const [currentDay, setCurrentDay] = useState("");
  const [hourArray, setHourArray] = useState<Hour[]>([]);

  // this effect sets the default date to the current day
  useEffect(() => {
    if (!currentDay) {
      setCurrentDay(new Date().toISOString().split("T")[0]);
    }
  }, []);

  // this effect reads all the hours that the user inserted
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

  // this function generates hourField props and iserts them in the array
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

  // this function empties the hourField prop array
  const removeHourFields = () => {
    setHourEntries([]);
  };

  // this function sets the date to the date selected by the user
  const dateUpdate = useCallback((date: string) => {
    setCurrentDay(date);
  }, []);

  // This function allows the child elements to update the hooks in this class
  const dayUpdate = (data: {
    id: number;
    count: number;
    dayTotal: number;
    dayTotalAfterTax: number;
    selectedHour: Hour;
  }) => {
    setHourEntries((prev) =>
      prev.map((entry) =>
        // Here each hourField updates it's own hourEntry based on their id
        entry.id === data.id
          ? { ...entry, ...data, hourType: data.selectedHour }
          : entry
      )
    );
  };

  // this function enters all the hourEntries in the database
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

  // this function instructs the flatlist on how to show the array elements
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
