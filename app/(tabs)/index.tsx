import { CalendarPicker } from "@/components/calendarPicker";
import HourField from "@/components/hourField";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { ReadHours, CreateHours, UpdateHours, DeleteHours } from "../database";
import { Hour } from "@/types/hour.type";

export default function Index() {
  const [hoursIds, setHoursIds] = useState(5);
  let normal = new Hour(1, 5, "normal");
  let extra = new Hour(2, 6, "extra");
  let festivo = new Hour(3, 7, "festivo");
  let noche = new Hour(4, 8, "noche");

  const hours = [normal, extra, festivo, noche];

  const createHour = () => {
    const hours = [];
    console.log(" create hours pressed");
    hours.push(normal, extra, festivo, noche);

    console.log(hours);

    CreateHours(hours);
  };

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
      key: hoursIds,
      hours: hours,
    },
  ]);
  // setHoursIds(hoursIds + 1);
  const test = () => {
    hourFields.forEach((field) => {
      console.log(field);
      console.log("miau");
    });
    return null;
  };

  // still need to fix hourIds not incrementing

  const generateHourFiels = () => {
    setHoursIds(hoursIds + 1);
    const newHourField = { key: hoursIds, hours: hours };
    setHourFields([...hourFields, newHourField]);
    hourFields.forEach((hour) => {
      console.log(hour.key);
    });
  };

  const removeHourFields = () => {
    setHourFields([]);
  };

  return (
    <View style={styles.container}>
      <Text>miau</Text>

      <Link href={"./()/about"} style={styles.button}>
        go to about page
      </Link>

      <Button title="DBTEST" onPress={() => createHour()}></Button>
      <Button
        title="Read hours from the db"
        onPress={() => readHour()}
      ></Button>
      <Button
        title="Update hours from the db"
        onPress={() => UpdateHours({ id: 1, value: 1, variety: "updated" })}
      ></Button>
      <Button
        title="Delete hours from the db"
        onPress={() => DeleteHours({ id: 1, value: 1, variety: "" })}
      ></Button>
      <View>
        {hourFields.length > 0 ? (
          hourFields.map((field) => (
            <HourField keyId={field.key} hour={field.hours} />
          ))
        ) : (
          <Text>Try adding some fields</Text>
        )}
      </View>
      <Button
        title="remove all hour fields"
        onPress={removeHourFields}
      ></Button>
      <Button title="Test" onPress={test}></Button>
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
