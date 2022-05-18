import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@eshop/products';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html'

})
export class CategoriesFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId!: string;
  endSubscription$: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['', Validators.required]

    });

    this._checkEditMode();
  }

  ngOnDestroy() {
    this.endSubscription$.next;
    this.endSubscription$.complete();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const category: Category = {
      _id: this.currentCategoryId,
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
      color: this.categoryForm['color'].value,


    };

    if (this.editMode) {
      this._updateCategory(category)
    } else {
      this._addCategory(category)
    }

  }

  onCancel() {
    this.location.back();
  }

  //Create Category
  private _addCategory(category: Category) {
    this.categoryService.createCategory(category)
      .pipe(takeUntil(this.endSubscription$))
      .subscribe(
        (category: Category) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Category ${category.name} is created`
          });
          //redirect to categories page after 2 seconds
          timer(2000).toPromise().then(() => {
            this.location.back();
          })

        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Category is not created'
          });

        }
      );
  };

  //Update Category
  private _updateCategory(category: Category) {
    this.categoryService.updateCategory(category)
      .pipe(takeUntil(this.endSubscription$))
      .subscribe(
        (category: Category) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Category ${category.name} Updated`
          });
          //redirect to categories page after 2 seconds
          timer(2000).toPromise().then(() => {
            this.location.back();
          })

        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Category is not Updated'
          });

        }
      );
  };


  //to check if is in editMode or not by check id params is exist
  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.currentCategoryId = params['id'];
        this.categoryService.getCategoryById(params['id'])
          .pipe(takeUntil(this.endSubscription$))
          .subscribe(category => {
            this.categoryForm['name'].setValue(category.name);
            this.categoryForm['icon'].setValue(category.icon);
            this.categoryForm['color'].setValue(category.color);
          })
      }
    })
  }

  //get form controls values
  get categoryForm() {
    return this.form.controls;
  }


}
