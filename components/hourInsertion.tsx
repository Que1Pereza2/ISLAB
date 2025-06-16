import { CreateHours, ReadHours, ReadTaxes } from "@/app/database";
import { Hour } from "@/types/hour.type";
import { Picker } from "@react-native-picker/picker";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import { View, TextInput, StyleSheet, Text } from "react-native";

type HourInsertionProps = {
  onInsertSuccess?: () => void;
};

export default function HourInsertion({ onInsertSuccess }: HourInsertionProps) {
  const [hourValue, setHourValue] = useState(0.0);
  const [hourVariety, setHourVariety] = useState("");
  const db = useSQLiteContext();

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
