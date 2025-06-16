import { ReadHours, CreateTax, ReadTaxes } from "@/app/database";
import { Hour } from "@/types/hour.type";
import { Tax } from "@/types/tax.type";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-native";
import { View, TextInput, StyleSheet, Text } from "react-native";

type TaxInsertionProps = {
  hourArray: Hour[];
  onInsertSuccess?: () => void;
};

export default function TaxInsertion({
  hourArray,
  onInsertSuccess,
}: TaxInsertionProps) {
  const [value, setValue] = useState(0.0);
  const [name, setName] = useState("");
  const [selectedHourID, setSelectedHourID] = useState(0);
  // const [hourArray, setHourArray] = useState<Hour[]>([]);
  const db = useSQLiteContext();

  useFocusEffect(
    useCallback(() => {
      const fetchHours = () => {
        try {
          ReadHours(db).then((data) => {
            console.log(data);
            // setHourArray(data);
          });
        } catch (err) {
          console.log(err);
        }
      };
      fetchHours();
    }, [db])
  );

  function insertion() {
    CreateTax(db, name, hourArray[selectedHourID].ID, value);
    console.log(
      `${name} tax was inserted with a value of ${value} and affects 
      ${hourArray[selectedHourID].Variety} hours`
    );
    onInsertSuccess?.();
  }

  return hourArray.length > 0 ? (
    <View>
      <Text>Name</Text>
      <TextInput
        style={styles.input}
        keyboardType="default"
        onChangeText={(itemValue) => setName(itemValue)}
      ></TextInput>
      <Text>Hours afected</Text>

      <Picker
        selectedValue={0}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedHourID(itemIndex);
          console.log(itemIndex, itemValue);
        }}
      >
        {hourArray.map((hour) => (
          <Picker.Item
            key={hour.ID}
            value={hour.Value}
            label={hour.Variety}
          ></Picker.Item>
        ))}
      </Picker>
      <Text>Text percentage</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(itemValue) => {
          let cleanedValue = itemValue.replace(",", ".");
          setValue(parseFloat(cleanedValue));
        }}
      ></TextInput>
      <Button title="Save Changes" onPress={insertion}></Button>
    </View>
  ) : (
    <View>
      <Text>First insert some hours!</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: "gray",
    borderColor: "green",
  },
});
