// App.js or CalendarScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
} from "react-native";
import { Calendar, DateData } from "react-native-calendars";

const ViewCalendar = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const wordsByDate: { [key: string]: string[] } = {
    "2025-06-16": ["apple", "banana"],
    "2025-05-17": ["cat"],
    "2025-05-18": ["dog", "elephant", "fish"],
  };

  return (
    <View style={styles.container}>
      <Calendar
        enableSwipeMonths
        // dayComponent={({
        //   date,
        //   state,
        // }: {
        //   date: DateData;
        //   state: "selected" | "disabled" | "today" | "";
        // }) => <Text>{date.day}</Text>}
        dayComponent={({
          date,
          state,
        }: {
          date: DateData;
          state: "selected" | "disabled" | "today" | "";
        }) => {
          const dateStr = date.dateString;
          const words = wordsByDate[dateStr] || [];

          return (
            <TouchableOpacity
              onPress={() => words.length > 0 && setSelectedDate(dateStr)}
              style={styles.dayContainer}
            >
              {/* This here renders the individual cells in the calendar */}
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
            {(wordsByDate[selectedDate] || []).map((word, idx) => (
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
  },
  dayContainer: {
    height: 60,
    padding: 4,
    alignItems: "center",
  },
  dayText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  disabledText: {
    color: "gray",
  },
  wordText: {
    fontSize: 10,
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
  },
  modalWord: {
    fontSize: 16,
    marginBottom: 4,
  },
});
