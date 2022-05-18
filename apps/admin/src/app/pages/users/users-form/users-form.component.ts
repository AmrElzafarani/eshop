import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html'
})
export class UsersFormComponent implements OnInit {

  form!: FormGroup;
  editmode = false;
  isSubmitted = false;
  currentUserid?: string;
  countries = []

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this._initUserform();
  }

  private _initUserform() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    })
  }

  onSubmit() {}

  onCancel() {}

  get userForm() {
    return this.form.controls;
  }

}
