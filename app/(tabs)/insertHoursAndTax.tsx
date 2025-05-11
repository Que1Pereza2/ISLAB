import React from "react";
import { Text, View, Button } from "react-native";
import { DropHours, ReadHours } from "../database";
import TaxInsertion from "@/components/taxInsertion";
import HourInsertion from "@/components/hourInsertion";
// import DataInsertion from "@/components/taxInsertion";
// import TaxInsertion from "@/components/taxInsertion";

export default function InsertHourAndTax() {
  const miau = "tax";

  async function read() {
    let hours = await ReadHours();

    console.log(hours);
  }

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
      <HourInsertion></HourInsertion>
      <TaxInsertion></TaxInsertion>
      <Button title="Delete ALL hours" onPress={DropHours}></Button>
      <Button title="ReadHours" onPress={read}></Button>
    </View>
  );
}
