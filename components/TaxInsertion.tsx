import { ReadHours, CreateTax, ReadTaxes } from "@/app/database";
import { Hour } from "@/types/hour.type";
import { Tax } from "@/types/tax.type";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useEffect, useState } from "react";
import { Button, TouchableOpacity } from "react-native";
import { View, TextInput, StyleSheet, Text } from "react-native";

// Props for the class
type TaxInsertionProps = {
  hourArray: Hour[];
  onInsertSuccess?: () => void;
};
// this is the component inside Insert hour and tax screen
export default function TaxInsertion({
  hourArray,
  onInsertSuccess,
}: TaxInsertionProps) {
  // React hooks
  const [value, setValue] = useState(0.0);
  const [name, setName] = useState("");
  const [selectedHourID, setSelectedHourID] = useState(0);
  const db = useSQLiteContext();

  // This effect pulls the hours from the database and sets the into an array
  // when the screen is in focus
  useFocusEffect(
    useCallback(() => {
      const fetchHours = () => {
        try {
          ReadHours(db).then((data) => {
            console.log(data);
          });
        } catch (err) {
          console.log(err);
        }
      };
      fetchHours();
    }, [db])
  );

  // This function inserts the tax into the database and notifies the parent.
  function insertion() {
    CreateTax(db, name, hourArray[selectedHourID].ID, value);
    console.log(
      `${name} tax was inserted with a value of ${value} and affects 
      ${hourArray[selectedHourID].Variety} hours`
    );
    onInsertSuccess?.();
  }

  // this checks if there are hours in the database, if there are not the
  // alert pops up to notify the user
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
      <View></View>
      <TouchableOpacity style={styles.utilityButton} onPress={insertion}>
        <Text>Save Changes</Text>
      </TouchableOpacity>
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
  utilityButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
  },
});
