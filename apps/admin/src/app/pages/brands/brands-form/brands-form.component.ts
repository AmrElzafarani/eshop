import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand, BrandsService } from '@eshop/products';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-brands-form',
  templateUrl: './brands-form.component.html',
  styles: [
  ]
})
export class BrandsFormComponent implements OnInit {

  constructor(
    private brandsService: BrandsService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,

  ) { }

  brandsForm!: FormGroup;
  isSubmitted = false;


  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.brandsForm = this.formBuilder.group({
      name: ['', Validators.required],

    });
  }

  private _addBrand(brand: Brand) {
    this.brandsService.createBrand(brand)
      .subscribe((brand: Brand) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Brand created`
        })
      },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Brand is not created'
          });

        }
      )
  }

  onSubmit() {
    const brand: Brand = {
      name: this.brandFormValues['name'].value
    }
    this._addBrand(brand)
  }

  get brandFormValues() {
    return this.brandsForm.controls;
  }

}
