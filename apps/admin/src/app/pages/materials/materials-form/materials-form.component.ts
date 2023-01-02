import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Material, MaterialsService } from '@eshop/products';

@Component({
  selector: 'admin-materials-form',
  templateUrl: './materials-form.component.html',
  styles: [
  ]
})
export class MaterialsFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private materialsService: MaterialsService,
    private messageService: MessageService,

  ) { }

  materialsForm!: FormGroup;
  isSubmitted = false;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.materialsForm = this.formBuilder.group({
      name: ['', Validators.required],

    });
  }

  onSubmit() {
    const material: Material = {
      name: this.materialFormValues['name'].value
    }

    this._addMaterial(material)
  }

  private _addMaterial(material: Material) {
    this.materialsService.createMaterial(material)
      .subscribe((material: Material) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Material ${material.name} is created`
        })
      },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Material is not created'
          });

        }
      )
  }

  get materialFormValues() {
    return this.materialsForm.controls;
  }

}
