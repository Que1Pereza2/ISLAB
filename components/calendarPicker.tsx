import { useFocusEffect } from "expo-router";
import { memo, useCallback, useState } from "react";
import { View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";

// Props for the calendar
type pickerProps = {
  onUpdate: (currentDay: string) => void;
  selectedDay: string;
};

// this The component for the calendar in insert Day
export const CalendarPicker = memo(({ onUpdate, selectedDay }: pickerProps) => {
  const [currentDay, setCurrentDay] = useState("");

  // This function sets the default day to the day that is received
  // from the parent
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
