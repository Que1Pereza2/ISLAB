import { Hour } from '@/types/hour.type';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync("hours.db")
db.execAsync(`DROP TABLE IF EXISTS Hours;
          CREATE TABLE IF NOT EXISTS Hours (id INTEGER PRIMARY KEY NOT NULL, value INTEGER NOT NULL, variety TEXT NOT NULL);
          INSERT INTO Hours (value, variety) VALUES (6 , 'Extra');
          `);
db.runAsync(
  "INSERT INTO Hours (value, vatiety) VALUES (?, ?)"
  ,100
  ,"aaa"
);

export const CreateHours = async (hours: Hour[]) => {
  console.log("enters the function")
  
  const createHours = await db.prepareAsync('INSERT INTO Hours (value, variety) VALUES ($value, $variety)')
  try{
    hours.forEach(async hour=>{
      if(hour.value && hour.variety)
        await createHours.executeAsync({$value:hour.value,$variety:hour.variety})
        .then(()=>{
            console.log( hour.variety + " created successfully with value of " + hour.value + '$')
        })
    })}catch (error){
        console.log("Couldn't create the hours due to : " + error);
    } finally {
        await createHours.finalizeAsync();
        console.log("Hours inserted successfully!")
      }
}

export const ReadHours = async():Promise<Hour[]> =>{
  console.log("enter read hours DB")  
  try{
    const houraArray = await db.getAllAsync("SELECT * FROM Hours");
    return (houraArray as Hour[]) ?? [];
  }catch(error){
    console.log("Couldn't read the hours due to : " + error);
    return [];
  }
}

export const UpdateHours = async (hourToUpdate: Hour) =>{
  console.log(hourToUpdate.id)
  // const updateHour = db.prepareAsync(`UPDATE Hours SET value=${hourToUpdate.value}, variety=${hourToUpdate.variety} WHERE id = $id`)
  const updateHour = db.prepareAsync("UPDATE Hours SET value=$value, variety=$variety WHERE id = $id")

  try{
    if(hourToUpdate.id && hourToUpdate.value && hourToUpdate.variety)
    (await updateHour).executeAsync({
      $value:hourToUpdate.value
      ,$variety:hourToUpdate.variety
      ,$id:hourToUpdate.id
    }).then(()=>{
      console.log(`Hour with ID ${hourToUpdate.id} and value ${hourToUpdate.value}`)
    })
  }catch(error){
    console.log(error)
  }finally{
    (await updateHour).finalizeAsync()
  }
}

export const DeleteHours = async (hourToDelete:Hour) =>{
  console.log(hourToDelete)
  // const deleteHour = await db.prepareAsync(`DELETE FROM Hours WHERE id = ${hourToDelete.id} `)
  const deleteHour = await db.prepareAsync(`DELETE FROM Hours WHERE id = $id `)

  try{
    if(hourToDelete.id)
      await deleteHour.executeAsync({
        $id:hourToDelete.id
      }).then(()=>{
        console.log(`Hour ${hourToDelete.variety} with ID ${hourToDelete.id} deleted successfully!`)
      })
  }catch(error){
    console.log(error)
  }finally{
    await deleteHour.finalizeAsync()
  }
}

export const DropHours = async ()=>{
  const dropHours = db.prepareAsync("DELETE FROM Hours; ")
  try{
    (await dropHours).executeAsync()
    console.log('Hours deleted')
  }catch(error){
    console.log(error)
  }finally{
    (await dropHours).finalizeAsync()
  }
}

export default {CreateHours,ReadHours,UpdateHours}