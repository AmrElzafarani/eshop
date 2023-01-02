import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Supplier, SupplierResponse } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  apiUrlsuppliers = environment.apiURL + 'suppliers';


  constructor(private http: HttpClient) { }

   //Get All suppliers
   getSuppliers(suppliersPerpage?: number, currentPage?: number): Observable<SupplierResponse> {
    const queryParams = `?pagesize=${suppliersPerpage}&page=${currentPage}`;
    return this.http.get<SupplierResponse>(`${this.apiUrlsuppliers}${queryParams}`)
  }

  //Create supplier
  createSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.apiUrlsuppliers, supplier)
  }

  //Search By Supplier Name
  serachBySupplierName = (name: string): Observable<SupplierResponse> => {
    return this.http.post<SupplierResponse>(`${this.apiUrlsuppliers}/searchBySupplierName`, {name})
  }
}
