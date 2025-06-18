import { CreateHours } from "@/app/database";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import { Button } from "react-native";
import { View, TextInput, Text } from "react-native";

type HourInsertionProps = {
  onInsertSuccess?: () => void;
};

export default function HourInsertion({ onInsertSuccess }: HourInsertionProps) {
  // React hooks
  const [hourValue, setHourValue] = useState(0.0);
  const [hourVariety, setHourVariety] = useState("");
  const db = useSQLiteContext();

  // This funtion inserts the hours in the database, resets the value and
  // sends the hour to the parent.
  async function submit() {
    try {
      await CreateHours(db, hourVariety, hourValue);
      setHourValue(NaN);
      setHourVariety("");
      onInsertSuccess?.();
    } catch (err) {
      console.log("Couldn't insert because of: ", err);
    }
  }

  return (
    <View>
      <Text>Name</Text>
      <TextInput
        keyboardType="default"
        onChangeText={(itemValue) => {
          setHourVariety(itemValue);
        }}
      ></TextInput>
      <Text>Value</Text>
      <TextInput
        keyboardType="numeric"
        onChangeText={(value) => {
          let cleanedValue = value.replace(",", ".");
          setHourValue(parseFloat(cleanedValue));
        }}
      ></TextInput>

      <Button title="Save" onPress={submit}></Button>
    </View>
  );
}
