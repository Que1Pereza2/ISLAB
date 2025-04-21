import { useState } from "react";
import { Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import Day from "react-native-calendars/src/calendar/day";
// import { Calendar, LocaleConfig } from "react-native-calendars";

export const CalendarPicker = () => {
  const [currentDay, setCurrentDay] = useState("");

  const displayDay = () => {
    return <Text>{currentDay.toString()}</Text>;
  };

  return (
    <View>
      <Calendar
        current={currentDay}
        markedDates={{
          currentDay: { selected: true, marked: true, selectedColor: "blue" },
        }}
        onDayPress={(day: DateData) => {
          setCurrentDay(day.dateString);
          console.log(day);
        }}
      />

      <View>{displayDay()}</View>
    </View>
  );
};
