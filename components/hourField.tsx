import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, Text, TextInput } from "react-native";
import { Hour } from "@/types/hour.type";

type TipeProps = {
  id: number;
  hour: Hour[];
};

export function HourField(props: TipeProps) {
  const id = props.id;
  // console.log(id);
  const hour = props.hour;
  // console.log(hour);
  const [hours, setHours] = React.useState("");
  const [selectedHourType, setSelectedHourType] = useState(0);

  return (
    <View>
      <Text>please insert the hours</Text>
      <TextInput
        keyboardType="number-pad"
        onChangeText={(e) => setHours(e)}
      ></TextInput>
      <Text>{hours}</Text>
      <Picker
        key={id}
        selectedValue={selectedHourType}
        onValueChange={(itemValue, itemIndex) => {
          console.log(props.hour[itemIndex].value);
          console.log(hour[itemIndex].variety);
          setSelectedHourType(itemValue);
        }}
      >
        {hour.map((hour) => (
          <Picker.Item key={hour.id} label={hour.variety} value={hour.value} />
        ))}
      </Picker>
    </View>
  );
}
export default HourField;
