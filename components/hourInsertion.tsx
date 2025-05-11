import { ReadHours } from "@/app/database";
import { Hour } from "@/types/hour.type";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import { View, TextInput, StyleSheet, Text } from "react-native";

export default function HourInsertion() {
  const [hourValue, setHourValue] = useState(0.0);
  const [hourVariety, setHourVariety] = useState("");

  function submit() {
    console.log(`${hourVariety} has been logged with a value of ${hourValue}`);
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
