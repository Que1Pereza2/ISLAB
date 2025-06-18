import { Day } from "@/types/day.type";
import { Hour } from "@/types/hour.type";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
} from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { getAllDays, ReadHours } from "../database";
import { MarkedDates } from "react-native-calendars/src/types";

// this is the screen that shows the calendar
const ViewCalendar = () => {
  const db = useSQLiteContext();
  const [selectedDate, setSelectedDate] = useState("");
  const [days, setDays] = useState<Day[]>([]);
  const [hours, setHours] = useState<Hour[]>([]);
  const [workedDates, setWorkedDates] = useState<MarkedDates>({});

  // This function pulls the days and the hours from the database and
  // inserts them in the array
  useFocusEffect(
    useCallback(() => {
      const getDbData = async () => {
        try {
          setDays(await getAllDays(db));
          setHours(await ReadHours(db));
        } catch (err) {
          console.log(err);
        }
      };
      getDbData();
    }, [db])
  );

  // this function parses the data form the database and assigns them keys so
  // they can be searched by date
  const daysByDate: Record<string, Day[]> = {};
  days.forEach((day) => {
    if (!daysByDate[day.dayMonth]) {
      daysByDate[day.dayMonth] = [];
    }
    daysByDate[day.dayMonth].push(day);
  });

  const workedDays: MarkedDates = {};

  // This effect creates the array from where the calendar pulls the data with
  // the necesarry props
  useEffect(() => {
    Object.entries(daysByDate).forEach(([dateString, dayEntries]) => {
      const totalHours = dayEntries.reduce((sum, day) => sum + day.count, 0);
      workedDays[dateString] = {
        selected: false,
        selectedColor: totalHours > 0 ? "green" : "red",
        marked: true,
        dotColor: "white",
      };
    });
    setWorkedDates(workedDates);
  }, []);

  // this function sums all the hours workes for a determined day
  const getDaySummary = (dateString: string): string[] => {
    const day = days.find((day) => day.dayMonth === dateString);
    if (day) return [`Worked: ${day.count} hours`];
    else return [];
  };

  return (
    <View style={styles.container}>
      <Calendar
        enableSwipeMonths
        markerDates={workedDates}
        // this option allows to configure the cells of the calendar
        dayComponent={({
          date,
          state,
        }: {
          date: DateData;
          state: "selected" | "disabled" | "today" | "";
        }) => {
          const dateStr = date.dateString;
          const words = getDaySummary(dateStr) || [];
          const worked = workedDates[dateStr]?.selectedColor === "green";

          return (
            <TouchableOpacity
              onPress={() => words.length > 0 && setSelectedDate(dateStr)}
              style={[
                styles.dayContainer,
                worked && styles.workedDay,
                !worked && workedDates[dateStr] && styles.notWorkedDay,
              ]}
            >
              {/* This creates the individual calendar cells */}
              <Text
                style={[
                  styles.dayText,
                  state === "disabled" && styles.disabledText,
                ]}
              >
                {date.day}
              </Text>

              {words.slice(0, 2).map((word, index) => (
                <Text key={index} style={styles.wordText} numberOfLines={1}>
                  {word}
                </Text>
              ))}
            </TouchableOpacity>
          );
        }}
      />

      {/* This here is the pop-up that shows when a date is pressed. */}
      <Modal visible={!!selectedDate} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Words for {selectedDate}</Text>
            {(getDaySummary(selectedDate) || []).map((word, idx) => (
              <Text key={idx} style={styles.modalWord}>
                {word}
              </Text>
            ))}
            <Button title="Close" onPress={() => setSelectedDate("")} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ViewCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    padding: 10,
    backgroundColor: "royalblue",
  },
  dayContainer: {
    height: 60,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  workedDay: {
    backgroundColor: "rgba(0, 255, 0, 0.2)",
  },
  notWorkedDay: {
    backgroundColor: "rgba(255, 0, 0, 0.2)",
  },
  dayText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  dayTextHighlight: {
    color: "white",
  },
  disabledText: {
    color: "gray",
  },
  wordText: {
    fontSize: 10,
    color: "#555",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "white",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalWord: {
    fontSize: 16,
    marginBottom: 4,
    color: "#555",
  },
});
