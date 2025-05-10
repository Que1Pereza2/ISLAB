// maybe here affects could be substituted with hourID instead of Hour
import { Hour } from "./hour.type"

export class Tax{
    /**id of the hour entry */
    id:number
    name:string
    affectsHour:number
    percentile:number

    constructor(id:number,name:string, affectsHour:number,percentile:number){
        this.id=id;
        this.name = name;
        this.affectsHour= affectsHour;
        this.percentile = percentile;
    }
}

const soundTax : Tax = {
    id:1
    ,name:"Sound Tax"
    ,affectsHour: 1
    ,percentile: 0.01
}