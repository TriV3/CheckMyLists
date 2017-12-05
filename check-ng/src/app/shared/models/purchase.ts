/**
 * Purchase model
 *
 * @export
 * @class Purchase
 */
export class Purchase {
    public id: number;
    public title: string;
    public price: number;
    public isDone: boolean;
    public order_id: number;

    /**
     * Creates an instance of Purchase.
     * @param {string} title Purchase title
     * @param {number} price Purchase price
     * @param {boolean} isDone Purchase accomplishment state
     *
     * @memberOf Task
     */
    constructor(
        title: string,
        price: number,
        isDone?: boolean
    ) {
        this.title = title;
        this.price = price;

        if (isDone) {
            this.isDone = isDone;
        } else {
            this.isDone = false;
        }

        this.order_id = -1;
    }
}
