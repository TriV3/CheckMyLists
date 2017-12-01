/**
 * Task model
 *
 * @export
 * @class Task
 */
export class Task {
    public _id: number;
    public title: string;
    public isDone: boolean;

    /**
     * Creates an instance of ArchiEquipment.
     * @param {number} _id Task ID
     * @param {string} title Task title
     * @param {boolean} isDone Task accomplishment state
     *
     * @memberOf Task
     */
    constructor(
        id: number,
        title: string,
        isDone?: boolean
    ) {
        this._id = id;
        this.title = title;
        if (isDone) {
            this.isDone = isDone;
        } else {
            isDone = false;
        }
    }
}
