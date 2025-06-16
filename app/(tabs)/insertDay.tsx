import { Hour } from "@/types/hour.type";
import { useCallback, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { CreateDay, GetHourByID, ReadHours } from "../database";
import HourField from "@/components/hourField";
import { CalendarPicker } from "@/components/calendarPicker";
import { useSQLiteContext } from "expo-sqlite";
import { useFocusEffect } from "expo-router";

// TODO: Need to find a away to return the data from the child components without adding a button because it gets confusing.

type hourFieldProp = {
  key: number;
  hours: Hour[];
};

export default function InsertDay() {
  const db = useSQLiteContext();
  const [currentDay, setCurrentDay] = useState("");
  const [count, setCount] = useState(0);
  const [dayTotal, setDayTotal] = useState(0.1);
  const [dayTotalAfterTax, setDayTotalAfterTax] = useState(0.1);
  const [hourVariety, setHourVariety] = useState<Hour>();

  const [hourArray, setHourArray] = useState<Hour[]>([]);
  const [hourFields, setHourFields] = useState<hourFieldProp[]>([]);

  useEffect(() => {
    console.log("Selected Date:", currentDay);
  }, [currentDay]);

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
    if (hourArray.length > 0) {
      const newHourField = { key: hourFields.length, hours: hourArray };
      setHourFields([...hourFields, newHourField]);
    } else {
      const newHourField = { key: 1, hours: hourArray };
      setHourFields([...hourFields, newHourField]);
    }
  };

  const createDay = () => {
    if (hourVariety)
      CreateDay(
        db,
        currentDay,
        count,
        dayTotal,
        dayTotalAfterTax,
        hourVariety?.ID
      ).then(() => {
        console.log(
          "Day created on ",
          currentDay,
          " with ",
          count,
          " hours, ",
          dayTotal,
          " as the total for the day, ",
          dayTotalAfterTax,
          " as the day total after taxes, ",
          "of the ",
          hourVariety,
          " variety"
        );
      });
  };

  const removeHourFields = () => {
    setHourFields([]);
  };

  const dateUpdate = useCallback((date: string) => {
    setCurrentDay(date);
  }, []);

  const dayUpdate = useCallback(
    async (day: {
      count: number;
      dayTotal: number;
      dayTotalAfterTax: number;
      hourVariety: number;
    }) => {
      setCount(day.count);
      setDayTotal(day.dayTotal);
      setDayTotalAfterTax(day.dayTotalAfterTax);
      let hour = await GetHourByID(db, day.hourVariety);
      setHourVariety(hour);
    },
    []
  );

  return (
    <View style={styles.container}>
      <View>
        {hourFields.length > 0 ? (
          hourFields.map((field) => (
            <HourField
              key={field.key}
              id={field.key}
              hour={field.hours}
              day={dayUpdate}
            />
          ))
        ) : (
          <Text>Try adding some fields</Text>
        )}
      </View>
      <Button
        title="remove all hour fields"
        onPress={removeHourFields}
      ></Button>
      <Button
        title="generate more hour fields"
        onPress={generateHourFiels}
      ></Button>
      <Button title="Insert day" onPress={createDay}></Button>
      <CalendarPicker onUpdate={dateUpdate} selectedDay={currentDay} />
      <Text>Current Day: {currentDay}</Text>
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
  text: {
    color: "white",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "yellow",
  },
});
