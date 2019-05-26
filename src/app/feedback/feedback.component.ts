import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../validations/Validations';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})


export class FeedbackComponent implements OnInit {

  feedbackFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10)
  ]);

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  model:FeedbackDTO = {
    name: '',
    email: '',
    feedback: ''
  }

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  sendFeedback(): void {
    
    this.apiService.postFeedback(this.model).subscribe(
      res => {
        location.reload();                     
      },
      err => {
        alert("An error has occurred while sending feedback");
      }
    )
  }

}

export interface FeedbackDTO {
  name:string;
  email:string;
  feedback:string;
}
