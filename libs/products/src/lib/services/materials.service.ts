import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Material, materialsResponse } from '../models/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {

  apiUrlMaterials = environment.apiURL + 'materials';

  constructor(private http: HttpClient) { }

  //Get All Materials
  getMaterials(materialsPerpage?: number, currentPage?: number): Observable<materialsResponse> {
    const queryParams = `?pagesize=${materialsPerpage}&page=${currentPage}`;
    return this.http.get<materialsResponse>(`${this.apiUrlMaterials}${queryParams}`)
  }

  //Create Material
  createMaterial(material: Material): Observable<Material> {
    return this.http.post<Material>(this.apiUrlMaterials, material)
  }

  //Search By Material Name
  searchByMaterialName = (name: string): Observable<materialsResponse> => {
    return this.http.post<materialsResponse>(`${this.apiUrlMaterials}/searchByMaterialName`, {name})

  }
}
