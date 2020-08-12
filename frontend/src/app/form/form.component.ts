import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from './form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private _fb: FormBuilder, private _service: FormService) {
    this.myForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }


  register() {
    let user = {
      name: this.myForm.get('name')?.value,
      email: this.myForm.get('email')?.value
    }
  this._service.sendMail(user).subscribe(
    res => {
      console.log("Successfully ");
    },
    err => {
      console.log(err);
    }
  );

  }

}
