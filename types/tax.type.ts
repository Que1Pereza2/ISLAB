// maybe here affects could be substituted with hourID instead of Hour
import { Hour } from "./hour.type"

export class Tax{
    /**id of the hour entry */
    ID:number
    name:string
    affects:number
    percentile:number

    constructor(id:number,name:string, affectsHour:number,percentile:number){
        this.ID=id;
        this.name = name;
        this.affects= affectsHour;
        this.percentile = percentile;
    }
}

const soundTax : Tax = {
    ID:1
    ,name:"Sound Tax"
    ,affects: 1
    ,percentile: 0.01
}