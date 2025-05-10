import React from "react";
import { Text, View, Button } from "react-native";
import { ReadHours, CreateHours, UpdateHours, DeleteHours } from "../database";
import DataInsertion from "@/components/TaxInsertion";
import TaxInsertion from "@/components/TaxInsertion";

export default function InsertHourAndTax() {
  const miau = "tax";
  const createHour = () => {
    const hours = [];
    console.log(" create hours pressed");
    // hours.push(normal, extra, festivo, noche);

    // console.log(hours);

    // CreateHours(hours);
  };
  return (
    <View>
      {/* <Text>Insert Hour And Day</Text>
      <Button
        title="Update hours from the db"
        onPress={() => UpdateHours({ id: 1, value: 1, variety: "updated" })}
      ></Button>
      <Button title="DBTEST" onPress={() => createHour()}></Button>

      <Button
        title="Delete hours from the db"
        onPress={() => DeleteHours({ id: 1, value: 1, variety: "" })}
      ></Button> */}
      <TaxInsertion></TaxInsertion>
    </View>
  );
}
