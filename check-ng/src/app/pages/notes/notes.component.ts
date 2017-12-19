import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../shared/services/notes/notes.service';
import { Note } from '../../shared/models/note';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss'],
    providers: [NotesService]
})
export class NotesComponent implements OnInit {

    public title = 'Notes';

    public note = new Note('');

    public carretPosition = 0;

    constructor(private noteService: NotesService) {
        this.note = new Note('');
    }

    ngOnInit() {
        this.GetNote();
    }

    GetNote(query = '') {
        return this.noteService.get().then(note => {
            if (note) {
                this.note = note as Note;
            } else {
                this.note = new Note('');
            }
        });
    }

    Blur() {
        this.noteService.replace(this.note).then(() => {
            this.GetNote();
        });
    }

    AddTab(event, input) {
        if (event.keyCode === 9) {
            event.preventDefault();
            event.stopPropagation();
            const start = event.target.selectionStart;
            const end = event.target.selectionEnd;
            this.note.text = this.note.text.substring(0, start) + '    ' + this.note.text.substring(end);
            this.carretPosition = start + 4;
        }
    }
    setSelectionRange(input, selectionStart, selectionEnd) {
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(selectionStart, selectionEnd);
        } else if (input.createTextRange) {
            const range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
        }
    }

    AddChar(input, char) {
        const start = input.selectionStart;
        const end = input.selectionEnd;
        this.note.text = this.note.text.substring(0, start) + char + this.note.text.substring(end);
        this.carretPosition = start + 1;
    }
}
