import { useFocusEffect } from "expo-router";
import { memo, useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import Day from "react-native-calendars/src/calendar/day";
// import { Calendar, LocaleConfig } from "react-native-calendars";

type pickerProps = {
  onUpdate: (currentDay: string) => void;
  selectedDay: string;
};

export const CalendarPicker = memo(({ onUpdate, selectedDay }: pickerProps) => {
  const [currentDay, setCurrentDay] = useState("");
  useFocusEffect(
    useCallback(() => {
      setCurrentDay(selectedDay);
    }, [])
  );
  return (
    <View>
      <Calendar
        current={currentDay}
        markedDates={{
          [currentDay]: {
            selected: true,
            selectedColor: "blue",
            selectedTextColor: "white",
            customStyles: {
              container: {
                borderWidth: 2,
                borderColor: "darkblue",
                borderRadius: 8,
              },
            },
          },
        }}
        // markedDates={{
        //   selectedDay: {
        //     selected: true,
        //     marked: true,
        //     selectedColor: "blue",
        //     selectedTextColor: "white",
        //   },
        // }}
        onDayPress={(day: DateData) => {
          onUpdate(day.dateString);
          setCurrentDay(day.dateString);
        }}
        theme={{
          todayTextColor: "blue",
          arrowColor: "blue",
        }}
      />
    </View>
  );
});
