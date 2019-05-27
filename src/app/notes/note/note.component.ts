import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../model/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note: Note;
  @Output() noteUpdate: EventEmitter<Note> = new EventEmitter<Note>();
  @Output() noteDelete: EventEmitter<Note> = new EventEmitter<Note>();

  constructor() { }

  ngOnInit() {
  }

  deleteNote() {
    this.noteDelete.emit(this.note);
  }

  updateNote() {
    this.noteUpdate.emit(this.note);
  }

}
