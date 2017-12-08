/**
 * Meal model
 *
 * @export
 * @class Meal
 */
export class Meal {


    public id: number;
    public title: string;
    public dayNumber: number;
    public dayTime: number;
    public isDone: boolean;
    public order_id: number;

    /**
     * Creates an instance of Meal.
     *
     * @memberOf Task
     */
    constructor(title: string = '', dayNumber: number = 0, dayTime: number = 0) {
        this.title = title;
        this.dayNumber = dayNumber;
        this.dayTime = dayTime;
        this.isDone = false;
        this.order_id = -1;
    }
}
