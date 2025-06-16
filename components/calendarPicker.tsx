import { memo, useState } from "react";
import { Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import Day from "react-native-calendars/src/calendar/day";
// import { Calendar, LocaleConfig } from "react-native-calendars";

type pickerProps = {
  onUpdate: (currentDay: string) => void;
  selectedDay?: string;
};

export const CalendarPicker = memo(({ onUpdate, selectedDay }: pickerProps) => {
  const [currentDay, setCurrentDay] = useState("");

  return (
    <View>
      <Calendar
        current={currentDay}
        markedDates={{
          currentDay: { selected: true, marked: true, selectedColor: "blue" },
        }}
        onDayPress={(day: DateData) => {
          // setCurrentDay(day.dateString);
          onUpdate(day.dateString);
        }}
      />

      <View>
        <Text>date {selectedDay}</Text>
      </View>
    </View>
  );
});
