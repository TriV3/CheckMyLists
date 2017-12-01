/**
 * Task model
 *
 * @export
 * @class Task
 */
export class Task {
    public id: number;
    public title: string;
    public isDone: boolean;

    /**
     * Creates an instance of ArchiEquipment.
     * @param {string} title Task title
     * @param {boolean} isDone Task accomplishment state
     *
     * @memberOf Task
     */
    constructor(
        title: string,
        isDone?: boolean
    ) {
        this.title = title;
        if (isDone) {
            this.isDone = isDone;
        } else {
            this.isDone = false;
        }
    }
}
