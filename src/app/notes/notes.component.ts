import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notebook } from './model/notebook';
import { ApiService } from '../shared/api.service';
import { Note } from './model/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notebooks: Notebook[] = [];
  notes: Note[] = [];
  selectedNotebook:Notebook;
  searchText: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllNotebooks();
    this.getAllNotes();
  }

  public getAllNotebooks() {
    let url = "http://localhost:8082/api/notebooks/all";

    this.apiService.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
      },
      err => {
        alert("An error has occured;");
      }
    )
  }

  public getAllNotes() {
    this.apiService.getAllNotes().subscribe(
      res => {
        this.notes = res;
      },
      err => {
        alert("Error occurred while downloading the notes");
      }
    )
  }

  public createNotebook() {
    let newNotebook:Notebook = {
      name: "new Notebook",
      id: null,
      nbOfNotes: 0

    }

    this.apiService.postNotebook(newNotebook)
      .subscribe(
        res => {
          newNotebook.id = res.id;
          this.notebooks.push(newNotebook);
        },
        err => {
          alert("An error has occured while saving the notebook");
        }
      );
  }

  public updateNotebook(notebook:Notebook) {
    this.apiService.postNotebook(notebook)
      .subscribe(
        res => {
          
        },
        err => {
          alert("An error has occured while saving the notebook");
        }
      );
  }

  public deleteNotebook(notebook:Notebook) {
    if(confirm("Are you sure??")) {
      this.apiService.deleteNotebook(notebook)
        .subscribe(
          res => {
            let indexOfNotebook = this.notebooks.indexOf(notebook);
            this.notebooks.splice(indexOfNotebook, 1);
          },
          err => {
            alert("Could not delete the notebook");
          }
        )
    }
  }

  deleteNote(note: Note) {
    if(confirm("Are you sure??")) {
      this.apiService.deleteNote(note.id)
        .subscribe(
          res => {
            let indexOfNote = this.notes.indexOf(note);
            this.notes.splice(indexOfNote, 1);
          },
          err => {
            alert("Could not delete the notebook");
          }
        )
    }
  }

  createNote(notebookId: string) {
    let newNote:Note = {
      id: null,
      title: "New note",
      text: "blabla",
      lastModifiedOn: null,
      notebookId: notebookId
    }

    this.apiService.saveNote(newNote).subscribe(
      res => {
        newNote.id = res.id;
        this.notes.push(newNote);
      },
      err => {
        alert("An error occurred");
      }
    )
  }

  selectNotebook(notebook: Notebook) {
    this.selectedNotebook = notebook;
    this.apiService.getNotesByNotebook(notebook.id).subscribe(
      res => {
        this.notes = res;
      },
      err => {
        alert("An error occurred");
      }
    )
  }

  updateNote(note:Note) {
    this.apiService.saveNote(note)
      .subscribe(
        res => {
          
        },
        err => {
          alert("An error has occured while saving the note");
        }
      );
  }

  selectAllNotes() {
    this.selectedNotebook = null;
    this.getAllNotes();
  }

}
