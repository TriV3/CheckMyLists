import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from '../../shared/services/notes/notes.service';
import { Note } from '../../shared/models/note';

import { TranslateService } from '../../translate';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss'],
    providers: [NotesService]
})
export class NotesComponent implements OnInit, OnDestroy {

    public title = 'Notes';

    public note = new Note('');

    public carretPosition = 0;

    private translateSubscription: any;

    constructor(private noteService: NotesService, private _translate: TranslateService) {
        this.note = new Note('');
    }

    ngOnInit() {
        this.GetNote();
        this.title = this._translate.instant('notes', null);

        this.translateSubscription = this.subscribeToLangChanged();
    }

    ngOnDestroy() {
        this.translateSubscription.unsubscribe();
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

    subscribeToLangChanged() {
        // refresh text
        // please unsubribe during destroy
        return this._translate.onLangChanged.subscribe(x => this.refreshText());
    }

    refreshText() {
        // refresh translation when language change
        this.title = this._translate.instant('notes', null);

    }
}
