/**
 * Purchase model
 *
 * @export
 * @class Purchase
 */
export class Purchase {
    public id: number;
    public title: string;
    public price: string;
    public isDone: boolean;
    public order_id: number;

    /**
     * Creates an instance of Purchase.
     * @param {string} title Purchase title
     * @param {string} price Purchase price
     * @param {boolean} isDone Purchase accomplishment state
     *
     * @memberOf Task
     */
    constructor(
        title: string,
        price: string,
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
