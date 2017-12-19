/**
 * Note model
 *
 * @export
 * @class Note
 */
export class Note {
    public text: string;

    /**
     * Creates an instance of Note.
     * @param {string} [text=''] Text of the note
     * @memberof Note
     */
    constructor(text: string = '') {
        this.text = text;
    }
}
