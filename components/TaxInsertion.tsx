import { ReadHours } from "@/app/database";
import { Hour } from "@/types/hour.type";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import { View, TextInput, StyleSheet, Text } from "react-native";

export default function TaxInsertion() {
  const [value, setValue] = useState(0.0);
  const [variety, setVariety] = useState("");
  const [selectedHour, setSelectedHour] = useState<Hour>();

  const [hourArray, setHourArray] = useState<Hour[]>([]);

  useEffect(() => {
    const fetchHours = async () => {
      try {
        const data = await ReadHours();
        setHourArray(data);
        // console.log(hourArray);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHours();
  }, []);

  const [hours, setHours] = useState([]);

  function insertion() {
    console.log("tax was inserted", value, " with name ", variety);
  }

  function test() {
    console.log(hourArray);
  }

  return (
    <View>
      <Text>Insert some Taxes</Text>
      <Text>Name</Text>
      <TextInput
        style={styles.input}
        keyboardType="default"
        onChangeText={(itemValue) => setVariety(itemValue)}
      ></TextInput>
      <Picker
        selectedValue={0}
        onValueChange={(itemValue, itemIndex) => {
          console.log(itemIndex, itemValue);
        }}
      >
        {
          // hourArray.length > 0 ? (
          hourArray.map((hour) => (
            <Picker.Item
              key={hour.id}
              value={hour.value}
              label={hour.variety}
            ></Picker.Item>
          ))
          // ) : (
          //   <Text>miau</Text>
          // )
        }
      </Picker>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(itemValue) => setValue(parseFloat(itemValue))}
      ></TextInput>
      <Button title="Save Changes" onPress={insertion}></Button>
      <Button title="read Hours" onPress={ReadHours}></Button>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: "gray",
    borderColor: "green",
  },
});
