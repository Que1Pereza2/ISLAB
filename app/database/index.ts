import { Hour } from '@/types/hour.type';
import { Tax } from '@/types/tax.type';
import * as SQLite from 'expo-sqlite';
import { SQLiteAnyDatabase } from 'expo-sqlite/build/NativeStatement';

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
    console.log("enter read hours DB")  
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

export const GeTaxFor = async(db:SQLite.SQLiteDatabase, hourID:number): Promise<Tax[]>=>{
  const geTaxFor = await db.prepareAsync('SELECT * FROM Tax WHERE affects = $hourID');
  try {
    const taxes = await geTaxFor.executeAsync({$hourID:hourID}).then((result)=>{
      console.log('Taxes returned are:', result );
    })
    return taxes ?? []
  } catch (error) {
    console.log("Couldn't get the taxes due to: ", error);
    return []
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
const ReadDay = async(db: SQLite.SQLiteDatabase, dayMonth:string) =>{
  try{
  // 2025-06-18
  
    // TODO: create a query that filters the entries by month, might as well group them by dayMonth to get the full sum.
    const dayArray = await db.execAsync('SELECT * FROM Day WHERE substr(dayMonth, 0, 5) = substr($dayMonth, 0, 5) and substr(dayMonth, 6, 2) = substr($dayMonth, 6, 2)')
    return dayArray ?? [];
  }catch(err){ console.log(err)}
}

const DeleteDay = async (db: SQLite.SQLiteDatabase, dayId:number) =>{
  const deleteDay = await db.prepareAsync('DELETE FROM Day where id= $dayId')
  try{
    deleteDay.executeAsync({$dayId:dayId})
  }catch(err){
    console.log(err);
  }finally{
    await deleteDay.finalizeAsync();
    console.log('Day with id ', dayId, 'has been deleted')
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