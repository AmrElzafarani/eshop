import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@eshop/products';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  editMode = false;
  isSubmitted = false;
  categories: Category[] = [];
  imageDisplay: string | ArrayBuffer | undefined;
  currentProductId!: string;
  endSubscription$: Subject<any> = new Subject();


  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private productService: ProductsService,
    private messageService: MessageService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {

    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  ngOnDestroy() {
    this.endSubscription$.next;
    this.endSubscription$.complete();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false]
    })
  }

  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.currentProductId = params['id'];
        this.productService.getproductById(params['id'])
          .pipe(takeUntil(this.endSubscription$))
          .subscribe(product => {
            this.productForm['name'].setValue(product.name);
            this.productForm['category'].setValue(product.category?._id);
            this.productForm['brand'].setValue(product.brand);
            this.productForm['price'].setValue(product.price);
            this.productForm['countInStock'].setValue(product.countInStock);
            this.productForm['isFeatured'].setValue(product.isFeatured);
            this.productForm['description'].setValue(product.description);
            this.productForm['richDescription'].setValue(product.richDescription);
            this.imageDisplay = product.image;
            this.productForm['image'].setValidators([]);
            this.productForm['image'].updateValueAndValidity();
          })
      }
    })
  }

  onSubmit() {

    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    console.log("clicked")
    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);

      console.log("key is" + key);
      console.log(this.productForm[key].value);
    });
    if (this.editMode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }

  onCancel() {
    console.log("canceled")
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    console.log(file)
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result as string;
        console.log(fileReader.result)
      }
      fileReader.readAsDataURL(file);
    }
  }

  //Get All Categories
  private  _getCategories() {
    return ( this.categoryService.getCategories())
      .pipe(takeUntil(this.endSubscription$))
      .subscribe(categories => {
        this.categories = categories
      })
  }

  //Create Product
  private _addProduct(productData: FormData) {
    this.productService.createProduct(productData)
      .pipe(takeUntil(this.endSubscription$))
      .subscribe((product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${product.name} is created`
        });

      },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Errorr',
            detail: 'Product is not created!'
          })
        }
      );
  }

  // update product
  private _updateProduct(productFormdata: FormData) {
    this.productService.updateProduct(productFormdata, this.currentProductId)
      .pipe(takeUntil(this.endSubscription$))
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Product is updated`
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Errorr',
            detail: 'Product is not updated!'
          })

        }
      )
  }

  get productForm() {
    return this.form.controls;
  }

}
