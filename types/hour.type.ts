export class Hour{

    /**id of the hour entry */
    ID:number

    /** The amount payed per hour of work.*/
    Value: number

    /** The type of hour that has been worked.*/
    Variety: string

    constructor( id:number, value:number, variety:string){
        this.ID = id
        this.Value = value
        this.Variety = variety
    }
}

const normal : Hour = {
    ID:1
    ,Value:5
    ,Variety:"Normal"
}
