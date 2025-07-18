import { Day } from '@/types/day.type';
import { Hour } from '@/types/hour.type';
import { Tax } from '@/types/tax.type';
import * as SQLite from 'expo-sqlite';

export const CreateHours = async (db:SQLite.SQLiteDatabase, hourVariety:string, hourValue:number) => {
  console.log("enters the function")
  
  const createHours = await db.prepareAsync('INSERT INTO Hour (value, variety) VALUES ($value, $variety)')
  try{
      await createHours.executeAsync({$value:hourValue,$variety:hourVariety})
      .then(()=>{
        console.log( hourVariety + " created successfully with value of " + hourValue + '$')
      })
    }catch (error){
      console.log("Couldn't create the hours due to : " + error);
    } finally {
      await createHours.finalizeAsync();
      console.log("Hours inserted successfully!")
    }
  }
  
  export const ReadHours = async(db:SQLite.SQLiteDatabase):Promise<Hour[]> =>{
  console.log("enter read hours DB")  
  try{
    const houraArray = await db.getAllAsync("SELECT * FROM Hour");
    return (houraArray as Hour[]) ?? [];
  }catch(error){
    console.log("Couldn't read the hours due to : " + error);
    return [];
  }
}

  export const GetHourByID = async(db:SQLite.SQLiteDatabase, hourID: number): Promise<Hour> => {
  
    console.log(`enter read hours DB with ID ${hourID}`)  
  try{
    const hour = await db.execAsync(`SELECT * FROM Hour where ID= ${hourID}`);
    return hour ?? new Hour(1,1,'');
  }catch(error){
    console.log("Couldn't read the hours due to : " + error);
    return new Hour(1,1,'');
  }
  }
export const UpdateHours = async (db:SQLite.SQLiteDatabase, hourToUpdate: Hour) =>{
  console.log(hourToUpdate.ID)
  // const updateHour = db.prepareAsync(`UPDATE Hours SET value=${hourToUpdate.value}, variety=${hourToUpdate.variety} WHERE id = $id`)
  const updateHour = db.prepareAsync("UPDATE Hours SET value=$value, variety=$variety WHERE id = $id")

  try{
    if(hourToUpdate.ID && hourToUpdate.Value && hourToUpdate.Variety)
    (await updateHour).executeAsync({
      $value:hourToUpdate.Value
      ,$variety:hourToUpdate.Variety
      ,$id:hourToUpdate.ID
    }).then(()=>{
      console.log(`Hour with ID ${hourToUpdate.ID} and value ${hourToUpdate.Value}`)
    })
  }catch(error){
    console.log(error)
  }finally{
    (await updateHour).finalizeAsync()
  }
}

export const DeleteHours = async (db:SQLite.SQLiteDatabase, hourToDelete:Hour) =>{
  console.log(hourToDelete)
  // const deleteHour = await db.prepareAsync(`DELETE FROM Hours WHERE id = ${hourToDelete.id} `)
  const deleteHour = await db.prepareAsync(`DELETE FROM Hours WHERE id = $id `)

  try{
    if(hourToDelete.ID)
      await deleteHour.executeAsync({
        $id:hourToDelete.ID
      }).then(()=>{
        console.log(`Hour ${hourToDelete.Variety} with ID ${hourToDelete.ID} deleted successfully!`)
      })
  }catch(error){
    console.log(error)
  }finally{
    await deleteHour.finalizeAsync()
  }
}

export const DropHours = async (db:SQLite.SQLiteDatabase)=>{
  const dropHours = db.prepareAsync("DELETE FROM Hour; ")
  try{
    (await dropHours).executeAsync()
    console.log('Hours deleted')
  }catch(error){
    console.log(error)
  }finally{
    (await dropHours).finalizeAsync()
  }
}

export const CreateTax = async (db:SQLite.SQLiteDatabase, name:string, affectsHour:number, percentile:number)=>{
  const createHours = await db.prepareAsync('INSERT INTO Tax (affects, name, percentile) VALUES ($affectsHour, $name, $percentile)')
  try{
        await createHours.executeAsync({$affectsHour:affectsHour, $name:name, $percentile:percentile})
        .then(()=>{
            console.log( name,"which affects", affectsHour ," created successfully with a percentile of ", percentile, '%')
        })
    }catch (error){
        console.log("Couldn't create the tax due to : " + error);
    } finally {
        await createHours.finalizeAsync();
        console.log("Tax inserted successfully!")
      }
}

export const ReadTaxes = async (db:SQLite.SQLiteDatabase) => {
    console.log("enter read taxes DB")  
    try{
    const taxesArray = await db.getAllAsync("SELECT * FROM Tax;");
    return (taxesArray as Tax[]) ?? [];
  }catch(error){
    console.log("Couldn't read the taxes due to : " + error);
    return [];
  }
}

export const GeTaxFor = async(db:SQLite.SQLiteDatabase, hourID:number):Promise<Tax[]> =>{
  const geTaxFor = await db.prepareAsync('SELECT * FROM Tax WHERE affects = $hourID');
  try {
    const result = await geTaxFor.executeAsync({$hourID:hourID})
    const taxes = await result.getAllAsync();
    return taxes as Tax[] ?? [];
  } catch (error) {
    console.log("Couldn't get the taxes due to: ", error);
    return []
  } finally{
    await geTaxFor.finalizeAsync();
  }
}

export const DeleteTaxes = async (db:SQLite.SQLiteDatabase, taxId:number) =>{
  console.log("Enters Delete")
  const deleteTaxes = await db.prepareAsync('DELETE FROM Tax WHERE ID=$taxId;')
  try{
    await deleteTaxes.executeAsync({$taxId:taxId}).then(()=>{
      console.log("Tax with", taxId," deleted successfully!")
    })
  }catch(err){
    console.log("Tax couldn't be deleted due to: ", err);
  }finally{
    await deleteTaxes.finalizeAsync();
    console.log("Tax deleted succesfully!")
  }
}
export const DeleteAllTaxes = async (db:SQLite.SQLiteDatabase) =>{
  console.log("Enters Delete")
  const deleteTaxes = await db.prepareAsync('DELETE FROM Tax;')
  try{
    await deleteTaxes.executeAsync()
  }catch(err){
    console.log("Tax couldn't be deleted due to: ", err);
  }finally{
    await deleteTaxes.finalizeAsync();
    console.log("Tax deleted succesfully!")
  }
}

export const CreateDay = async (db: SQLite.SQLiteDatabase,dayMonth: string, count: number, dayTotal: number, dayTotalAfterTax: number, hourVariety:number) =>{
  const createHours = await db.prepareAsync('INSERT INTO Day(dayMonth,count,dayTotal,dayTotalAfterTax, hourVariety) VALUES ($dayMonth, $count, $dayTotal, $dayTotalAfterTax, $hourVariety)')
  try{
    await createHours.executeAsync({$dayMonth:dayMonth, $count:count, $dayTotal:dayTotal, $dayTotalAfterTax:dayTotalAfterTax, $hourVariety:hourVariety})
    .then(()=>{
      console.log( dayMonth," was inserted with a count of ", count ," ", hourVariety, " type hours, a total of ", dayTotal, " and after tax of ",dayTotalAfterTax );
    })
  }catch (error){
        console.log("Couldn't create the day due to : " + error);
  } finally {
      await createHours.finalizeAsync();
      console.log("Tax inserted successfully!")
  }
}

export const getAllDays = async(db:SQLite.SQLiteDatabase)=>{
   console.log("enter read day DB")  
    try{
    const taxesArray = await db.getAllAsync("SELECT * FROM Day;");
    return (taxesArray as Day[]) ?? [];
  }catch(error){
    console.log("Couldn't read the Day due to : " + error);
    return [];
  }
}
export const ReadDay = async(db: SQLite.SQLiteDatabase, dayMonth:string): Promise<Day[]> =>{
  db.execAsync("Insert into Day(dayMonth, count, dayTotal, dayTotalAfterTax, hourVariety) VALUES('2025-06-15',8,129,120,18)")
  const dayArray = await db.prepareAsync('SELECT * FROM Day WHERE substr($dayMonth, 0, 5) = substr($dayMonth, 0, 5) and substr($dayMonth, 6, 2) = substr($dayMonth, 6, 2)')
  try{
    const result = await dayArray.executeAsync({$dayMonth:dayMonth});
    const dayList = await result.getAllAsync();
    return dayList as Day[] ?? [];
  }catch(err){ 
    console.log(err)
    return [];
  }
}

export const DeleteDay = async (db: SQLite.SQLiteDatabase) =>{
  const deleteDay = await db.prepareAsync('DELETE FROM Day')
  try{
    deleteDay.executeAsync()
  }catch(err){
    console.log(err);
  }finally{
    await deleteDay.finalizeAsync();
    console.log('Day have been deleted')
  }
}

export default {
  CreateHours,
  ReadHours,
  UpdateHours,
  DeleteHours,
  DropHours,
  CreateTax,
  ReadTaxes,
  DeleteTaxes,
  GeTaxFor,
  CreateDay,
  ReadDay,
  DeleteDay
}