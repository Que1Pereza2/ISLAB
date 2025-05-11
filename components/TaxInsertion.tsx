import { ReadHours } from "@/app/database";
import { Hour } from "@/types/hour.type";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import { View, TextInput, StyleSheet, Text } from "react-native";

export default function TaxInsertion() {
  const [value, setValue] = useState(0.0);
  const [name, setName] = useState("");
  const [selectedHourID, setSelectedHourID] = useState(0);

  const [hourArray, setHourArray] = useState<Hour[]>([]);

  useEffect(() => {
    const fetchHours = async () => {
      try {
        const data = await ReadHours();
        setHourArray(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHours();
  }, []);

  function insertion() {
    console.log(
      `${name} tax was inserted with a value of ${value} and affects 
      ${hourArray[selectedHourID].variety} hours`
    );
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
            key={hour.id}
            value={hour.value}
            label={hour.variety}
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
      <Button title="read Hours" onPress={ReadHours}></Button>
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
