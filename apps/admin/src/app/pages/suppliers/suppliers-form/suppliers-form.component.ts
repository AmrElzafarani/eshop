import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Supplier, SuppliersService } from '@eshop/products';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-suppliers-form',
  templateUrl: './suppliers-form.component.html',
  styles: [
  ]
})
export class SuppliersFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private suppliersService: SuppliersService,
    private messageService: MessageService,
  ) { }

  supplierForm!: FormGroup;
  isSubmitted = false;


  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.supplierForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  onSubmit() {
    const supplier: Supplier = {
      name: this.supplierFormValues['name'].value,
      phone: this.supplierFormValues['phone'].value,
      address: this.supplierFormValues['address'].value

    }

    this.addSupplier(supplier)
  }

  private addSupplier(supplier: Supplier) {
    this.suppliersService.createSupplier(supplier)
    .subscribe((supplier: Supplier) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Supllier ${supplier.name} is created`
      })
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Supplier is not created'
      });

    })
  }

  get supplierFormValues() {
    return this.supplierForm.controls;
  }
 

}
