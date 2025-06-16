export class Day{

    /**id of the day entry */
    ID:number

    /** The day and the month of the entry separated by a dash('-').*/
    dateString: string
    
    /** The amount of hours worked on this day of this variety.*/
    count: number

    /** The total earned today from this hour variety.*/
    dayTotal: number

    /** The amount earned from this hour variety after the taxes have been applied.*/
    dayTotalAfterTax: number

    /** The type of hour worked for this entry*/
    hourVariety: number

    constructor( id:number, dayMonth: string, count: number, dayTotal: number, dayTotalAfterTax: number, hourVariety: number){
        this.ID = id
        this.dateString=dayMonth
        this.count=count
        this.dayTotal= dayTotal
        this.dayTotalAfterTax= dayTotalAfterTax
        this.hourVariety= hourVariety
    }
}

const today : Day = {
    ID:1,
    dateString: "18-05-2058",
    count: 5,
    dayTotal: 125.34,
    dayTotalAfterTax: 120.21,
    hourVariety: 2
}
