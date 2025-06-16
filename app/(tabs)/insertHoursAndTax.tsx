import React, { useCallback, useState } from "react";
import { Text, View, Button } from "react-native";
import { DeleteHours, DropHours, ReadHours, ReadTaxes } from "../database";
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
    <View>
      {/* Here it would be a good idea to create a modal for both hours and 
      taxes so that the tab is cleaner looking */}
      <View>
        {taxArray.length > 0 ? (
          taxArray.map((element) => (
            <Text key={`key-${element.ID}`}>
              {element.name} {element.affects} {element.percentile}
            </Text>
          ))
        ) : (
          <Text>No txes</Text>
        )}
      </View>
      <HourInsertion
        onInsertSuccess={() => {
          readHours();
          readTaxes();
        }}
      />
      <TaxInsertion
        hourArray={hoursArray}
        onInsertSuccess={() => {
          readHours();
          readTaxes();
        }}
      ></TaxInsertion>
      <Button title="Delete ALL hours" onPress={dropHours}></Button>
      <Button title="ReadHours" onPress={readHours}></Button>
      <Button title="ReadTaxes" onPress={readTaxes}></Button>
    </View>
  );
}
