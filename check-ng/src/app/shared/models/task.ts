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
    public order_id: number;

    /**
     * Creates an instance of Task.
     * @param {string} title Title of the task
     * @param {boolean} isDone Task accomplishment state
     * @memberof Task
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
        this.order_id = -1;
    }
}
