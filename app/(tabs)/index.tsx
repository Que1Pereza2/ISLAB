import { CalendarPicker } from "@/components/calendarPicker";
import HourField from "@/components/hourField";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { Hour } from "@/types/hour.type";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>miau</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "royalblue",
  },
  text: {
    color: "white",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "yellow",
  },
});
