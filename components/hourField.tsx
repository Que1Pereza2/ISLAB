import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, Text, TextInput } from "react-native";
import { Hour } from "@/types/hour.type";

type TipeProps = {
  keyId: number;
  hour: Hour[];
};

export function HourField({ keyId, hour }: TipeProps) {
  const fieldKey = keyId;
  const fieldHours = hour;
  const [hours, setHours] = React.useState("");
  const [selectedHourType, setSelectedHourType] = useState<number | undefined>(
    undefined
  );

  const miiau = () => {
    const elements = [];
    for (let index = 0; index < fieldHours.length; index++) {
      elements.push(
        <Picker.Item
          key={
            fieldHours[index].id
              ? fieldHours[index].id
              : `${fieldKey} - ${index}`
          }
          label={fieldHours[index].variety}
          value={fieldHours[index].value}
        />
      );
    }
    return elements;
  };

  return (
    <View>
      <Text>please insert the hours</Text>
      <TextInput
        keyboardType="number-pad"
        onChangeText={(e) => setHours(e)}
      ></TextInput>
      <Text>{hours}</Text>
      <Picker
        selectedValue={selectedHourType}
        onValueChange={(itemValue, itemIndex) => {
          console.log(hour[itemIndex].value);
          console.log(hour[itemIndex].variety);
          setSelectedHourType(itemValue);
        }}
      >
        {miiau()}
      </Picker>
    </View>
  );
}
export default HourField;
