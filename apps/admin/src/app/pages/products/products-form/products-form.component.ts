import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Brand, BrandsService, CategoriesService, Category, Material, MaterialsService, Product, ProductsService, Supplier, SuppliersService } from '@eshop/products';
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
  brands: Brand[] = [];
  suppliers: Supplier[] = [];
  materials: Material[] = [];
  imageDisplay: string | ArrayBuffer | undefined;
  currentProductId!: string;
  endSubscription$: Subject<any> = new Subject();

  uploadedFiles: any[] = [];



  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private productService: ProductsService,
    private brandsService: BrandsService,
    private suppliersService: SuppliersService,
    private matrialsService: MaterialsService,
    private messageService: MessageService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {

    this._initForm();
    // this._getCategories();
    // this._getBrands();
    // this._getSuppliers();
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
      material: ['', Validators.required],
      supplier: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
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
            this.productForm['brand'].setValue(product.brand?._id);
            this.productForm['material'].setValue(product.material?._id);
            this.productForm['supplier'].setValue(product.supplier?._id);
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

  searchByCategoryName(event:any) {
    console.log(event)
    this.categoryService.serachByCategoryName(event.query)
    .subscribe(res => {
      console.log(res.message)
      this.categories = res.message
    })
  }

  searchBySupplierName(event:any) {
    console.log(event)
    this.suppliersService.serachBySupplierName(event.query)
    .subscribe(res => {
      console.log(res.message)
      this.suppliers = res.message
    })
  }

  searchByMaterialName(event:any) {
    console.log(event)
    this.matrialsService.searchByMaterialName(event.query)
    .subscribe(res => {
      console.log(res.message)
      this.materials = res.message
    })
  }

  searchByBrandName(event:any) {
    console.log(event)
    this.brandsService.serachByBrandName(event.query)
    .subscribe(res => {
      console.log(res.message)
      this.brands = res.message
    })
  }

  selectedCategory(e:any) {
    console.log(this.productForm['category'].value._id)
    this.productForm['category'].patchValue(e._id)
  }

  selectedBrand(e:any) {
    this.productForm['brand'].patchValue(e._id)
  }

  selectedMaterial(e:any) {
    this.productForm['material'].patchValue(e._id)
  }

  selectedSupplier(e:any) {
    this.productForm['supplier'].patchValue(e._id)
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

  onImageUpload(event: any) {
    const file = event.target.files[0];
    console.log(file)
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result as string;
        // console.log(fileReader.result)
      }
      fileReader.readAsDataURL(file);
    }
  }

  get productForm() {
    return this.form.controls;
  }

}
