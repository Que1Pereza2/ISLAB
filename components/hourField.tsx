import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, Text, TextInput, Button } from "react-native";
import { Hour } from "@/types/hour.type";
import { GeTaxFor } from "../app/database";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { Tax } from "@/types/tax.type";
type TipeProps = {
  id: number;
  hour: Hour[];
  day: (day: {
    count: number;
    dayTotal: number;
    dayTotalAfterTax: number;
    hourVariety: number;
  }) => void;
};

export function HourField(props: TipeProps) {
  const db = useSQLiteContext();
  const id = props.id;
  const hour = props.hour;
  const [count, setCount] = useState(0);
  const [dayTotal, setDayTotal] = useState(0.1);
  const [dayTotalAfterTax, setDayTotalAfterTax] = useState(0.1);
  const [hourVariety, setHourVariety] = useState(0);
  const [taxesArray, setTaxesArray] = useState<Tax[]>([]);
  const [hours, setHours] = useState("");

  const [selectedHourType, setSelectedHourType] = useState(0);

  const returnData = () => {
    getTaxes();
    props.day({ count, dayTotal, dayTotalAfterTax, hourVariety });
  };

  const getTaxes = async () => {
    setTaxesArray(await GeTaxFor(db, hourVariety));
    calculateTotalAfterTax();
  };

  const calculateTotalAfterTax = () => {
    let baseSum = dayTotal;
    taxesArray.forEach((tax) => {
      let percetage = 100 - tax.percentile;
      baseSum = baseSum * percetage;
    });
    setDayTotalAfterTax(baseSum);
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
        key={id}
        selectedValue={selectedHourType}
        onValueChange={(itemValue, itemIndex) => {
          console.log(props.hour[itemIndex].ID);
          console.log(props.hour[itemIndex].Value);
          console.log(hour[itemIndex].Variety);
          setSelectedHourType(itemValue);
        }}
      >
        {hour.map((hour) => (
          <Picker.Item key={hour.ID} label={hour.Variety} value={hour.Value} />
        ))}
      </Picker>
      <Button title="Insert Day" onPress={returnData}></Button>
    </View>
  );
}
export default HourField;
