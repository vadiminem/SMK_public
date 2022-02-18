import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private apiPath = environment.apiUrl + 'Images';
  //private apiPath = 'http://localhost:64329/api/Images/';

  constructor(private http: HttpClient) { }

  loadProductImage(pathUrl: string) {
    const url = this.apiPath + '/' + pathUrl;
    return this.http.get(url, {responseType: 'blob'});
  }

  getImagesCount(pathUrl: string) {
    const url = this.apiPath + '/' + pathUrl;
    return this.http.get<number>(url);
  }
}
