import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@eshop/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',

})
export class CategoriesListComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  totalCategoriesCount = 0;
  categoriesPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [10, 20, 30];
  endSubscription$: Subject<any> = new Subject();

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getCategories();
  }

  ngOnDestroy() {
    this.endSubscription$.next;
    this.endSubscription$.complete();
  }

  handlePagination(pageData: any) {
    this.currentPage = pageData.page + 1;
    this.categoriesPerPage = pageData.rows
    this.getCategories()
  }

  //Delete Category with confirmation dialog
  deleteCategory(categoryId: string) {

    this.confirmationService.confirm({
      message: 'Do you want to delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId)
          .pipe(takeUntil(this.endSubscription$))
          .subscribe(
            (category: Category) => {
              this.getCategories()
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `Category ${category.name} is deleted`
              });
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Category is not deleted'
              });

            }
          );
      },
      key: "positionDialog"

    });
  }

  //Update Category with confirmation dialog
  updateCategory(categoryId: string) {

    this.router.navigateByUrl(`categories/form/${categoryId}`)

  }


  private async getCategories() {
    (await this.categoriesService.getCategories(this.categoriesPerPage, this.currentPage))
      .pipe(takeUntil(this.endSubscription$))
      .subscribe(res => {
        this.categories = res.message;
        this.totalCategoriesCount = res.total
      })
  }

}
