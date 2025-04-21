import { CalendarPicker } from "@/components/calendarPicker";
import HourField from "@/components/hourField";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { ReadHours, CreateHours, UpdateHours, DeleteHours } from "../database";
import { Hour } from "@/types/hour.type";

export default function Index() {
  let initialIds = 5;
  // const [newHour, setNewHour] = useState(Hour);
  let [hors, setHors] = useState<Hour[]>([]);
  let normal = new Hour(5, "normal");
  let extra = new Hour(6, "extra");
  let festivo = new Hour(7, "festivo");
  let noche = new Hour(8, "noche");

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
  type HourField = {
    key: number;
    hours: Hour[];
  };

  const [hourFields, setHourFields] = useState<HourField[]>([
    {
      key: 0,
      hours: [new Hour()],
    },
  ]);

  // still need to fix hourIds not incrementing

  const generateHourFiels = () => {
    // hoursIds += 1;
    console.log(initialIds);
    // typer.forEach((hour) => {
    const [hoursIds, setHoursIds] = useState(initialIds);
    setHoursIds((prevId) => prevId + 1);

    const newHourField = { key: hoursIds + 1, hours: hours };
    setHourFields([...hourFields, newHourField]);
    // });
    console.log(hourFields);
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
