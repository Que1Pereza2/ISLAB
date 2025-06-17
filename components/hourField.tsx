import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, Text, TextInput } from "react-native";
import { Hour } from "@/types/hour.type";
import { GeTaxFor } from "../app/database";
import { useSQLiteContext } from "expo-sqlite";

type TipeProps = {
  id: number;
  hour: Hour[];
  day: (data: {
    id: number;
    count: number;
    dayTotal: number;
    dayTotalAfterTax: number;
    selectedHour: Hour;
  }) => void;
};

export function HourField({ id, hour, day }: TipeProps) {
  const db = useSQLiteContext();
  const [count, setCount] = useState(0);
  const [selectedHour, setHourF] = useState<Hour>();
  const [hours] = useState("");

  const [selectedHourType] = useState(0);

  useEffect(() => {
    if (hour.length > 0 && selectedHourType !== null) {
      setHourF(hour[selectedHourType]);
    }
  }, [selectedHourType, hour]);

  useEffect(() => {
    if (selectedHour && count) {
      const returnData = async () => {
        const DayTotalF = count * selectedHour.Value;
        const Taxes = await GeTaxFor(db, selectedHour.ID);

        const DayTotalAfterTaxF = Taxes.reduce(
          (total, tax) => total * (1 - tax.percentile / 100),
          DayTotalF
        );

        console.log(DayTotalF);
        console.log(count);
        console.log(selectedHour.Value);
        console.log(DayTotalAfterTaxF);

        day({
          id,
          count,
          dayTotal: DayTotalF,
          dayTotalAfterTax: DayTotalAfterTaxF,
          selectedHour,
        });
      };
      returnData();
    }
  }, [count, selectedHour, db]);

  return (
    <View>
      <Text>please insert the hours</Text>
      <TextInput
        keyboardType="number-pad"
        defaultValue="0"
        onChangeText={(e) => setCount(Number(e))}
      ></TextInput>
      <Text>{hours}</Text>
      <Picker
        key={id}
        placeholder="0"
        selectedValue={selectedHourType}
        onValueChange={(itemValue, itemIndex) => {
          console.log("miau", hour[itemIndex]);
          setHourF(hour[itemIndex]);
        }}
      >
        {hour.map((hour) => (
          <Picker.Item key={hour.ID} label={hour.Variety} value={hour.Value} />
        ))}
      </Picker>
    </View>
  );
}
export default HourField;
