import React, { useCallback, useState } from "react";
import { Text, View, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { DeleteAllTaxes, DropHours, ReadHours, ReadTaxes } from "../database";
import TaxInsertion from "@/components/taxInsertion";
import HourInsertion from "@/components/hourInsertion";
import { useSQLiteContext } from "expo-sqlite";
import { useFocusEffect } from "expo-router";
import { Hour } from "@/types/hour.type";
import { Tax } from "@/types/tax.type";

export default function InsertHourAndTax() {
  const db = useSQLiteContext();
  const [hoursArray, setHourArray] = useState<Hour[]>([]);
  const [taxArray, setTaxArray] = useState<Tax[]>([]);
  const [showHourModal, setShowHourModal] = useState(false);
  const [showTaxModal, setShowTaxModal] = useState(false);

  const readHours = useCallback(() => {
    ReadHours(db).then((results) => {
      setHourArray(results);
      console.log(results);
    });
  }, [db]);

  const dropHours = useCallback(() => {
    DropHours(db);
    readHours();
  }, [db]);

  const readTaxes = useCallback(() => {
    ReadTaxes(db).then((taxes) => {
      setTaxArray(taxes);
      console.log(taxes);
    });
  }, [db]);

  const dropTaxes = useCallback(() => {
    DeleteAllTaxes(db);
    readTaxes();
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      readHours();
      readTaxes();
    }, [readHours, readTaxes, dropHours])
  );

  const refreshAllData = useCallback(async () => {
    await Promise.all([readHours(), readTaxes()]);
  }, [readHours, readTaxes]);

  return (
    <View style={styles.container}>
      {/* Tax List Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Taxes</Text>
        {taxArray.length > 0 ? (
          taxArray.map((element) => (
            <Text key={`key-${element.ID}`} style={styles.itemText}>
              {element.name} {element.affects} {element.percentile}%
            </Text>
          ))
        ) : (
          <Text style={styles.noItemsText}>No taxes</Text>
        )}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowTaxModal(true)}
        >
          <Text style={styles.buttonText}>Add Tax</Text>
        </TouchableOpacity>
      </View>

      {/* Hour Insertion Modal */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showHourModal}
        onRequestClose={() => setShowHourModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <HourInsertion
              onInsertSuccess={() => {
                readHours();
                readTaxes();
                setShowHourModal(false);
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowHourModal(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Tax Insertion Modal */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showTaxModal}
        onRequestClose={() => setShowTaxModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TaxInsertion
              hourArray={hoursArray}
              onInsertSuccess={() => {
                readHours();
                readTaxes();
                setShowTaxModal(false);
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowTaxModal(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowHourModal(true)}
        >
          <Text style={styles.buttonText}>Add Hours</Text>
        </TouchableOpacity>

        <View style={styles.utilityButtons}>
          <TouchableOpacity style={styles.utilityButton} onPress={dropHours}>
            <Text style={styles.buttonText}>Delete ALL hours</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.utilityButton} onPress={dropTaxes}>
            <Text style={styles.buttonText}>Delete ALL Taxes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "royalblue",
  },
  section: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  noItemsText: {
    fontSize: 16,
    color: "#999",
    fontStyle: "italic",
  },
  actionsContainer: {
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
  },
  utilityButtons: {
    marginTop: 10,
  },
  utilityButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    maxHeight: "80%",
  },
  closeButton: {
    backgroundColor: "#f44336",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
});
