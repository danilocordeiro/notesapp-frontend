import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notebook } from './model/notebook';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notebooks: Notebook[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllNotebooks();
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

}
