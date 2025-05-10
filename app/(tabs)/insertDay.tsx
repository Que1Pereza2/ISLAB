import { Hour } from "@/types/hour.type";
import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ReadHours } from "../database";
import HourField from "@/components/hourField";
import { CalendarPicker } from "@/components/calendarPicker";

export default function InsertDay() {
  const [hoursIds, setHoursIds] = useState(5);

  let normal = new Hour(1, 5, "normal");
  let extra = new Hour(2, 6, "extra");
  let festivo = new Hour(3, 7, "festivo");
  let noche = new Hour(4, 8, "noche");

  const hours = [normal, extra, festivo, noche];

  const readHour = async () => {
    console.log("readHoursPressed");
    let hourss;

    try {
      hourss = await ReadHours();
      if (hourss)
        for (let i = 0; i < hourss.length; i++) console.log(hourss[i]);
    } catch (error) {
      console.log(error);
    }
  };

  const [hourFields, setHourFields] = useState([
    {
      key: 4,
      hours: hours,
    },
  ]);

  const generateHourFiels = () => {
    setHoursIds(hoursIds + 1);
    const newHourField = { key: hoursIds, hours: hours };
    setHourFields([...hourFields, newHourField]);
  };

  const removeHourFields = () => {
    setHourFields([]);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Read hours from the db"
        onPress={() => readHour()}
      ></Button>
      <View>
        {hourFields.length > 0 ? (
          hourFields.map((field) => (
            <HourField key={field.key} id={field.key} hour={field.hours} />
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
      <CalendarPicker />
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
