import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form = true;
  userInfo: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.userInfo = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumbers: new FormArray([]),
      address: new FormGroup({
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zip: new FormControl('', Validators.required),
      }),
    });
  }

  onSubmit() {
    console.table(this.userInfo.value);
    this.form = false;
  }

  getControls() {
    return (this.userInfo.get('phoneNumbers') as FormArray).controls;
  }

  onAddPhone() {
    (<FormArray>this.userInfo.get('phoneNumbers')).push(new FormControl());
  }

  onNewForm() {
    this.form = true;
    this.userInfo.reset();
  }
}
