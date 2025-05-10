export class Hour{

    /**id of the hour entry */
    id:number

    /** The amount payed per hour of work.*/
    value: number

    /** The type of hour that has been worked.*/
    variety: string

    constructor( id:number, value:number, variety:string){
        this.id = id
        this.value = value
        this.variety = variety
    }
}

const normal : Hour = {
    id:1
    ,value:5
    ,variety:"Normal"
}
