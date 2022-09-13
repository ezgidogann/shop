import { Injectable } from '@angular/core';
import {Category} from "../category/category";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {tap,catchError} from "rxjs/operators";

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http:HttpClient) { }
  path = " http://localhost:3000/categories"
  getCategory():Observable<Category[]>{
    return this.http
      .get<Category[]>(this.path).pipe(
        tap(data=>console.log(JSON.stringify(data))),
        catchError(this.handleEror)
      );
  }
  handleEror(err: HttpErrorResponse) {
    let errorMessage =''
    if(err.error instanceof ErrorEvent){
      errorMessage = 'Bir Hata Oluştu' + err.error.message
    }else{
      errorMessage = 'Sistemsel bir hata'
    }
    return throwError(errorMessage);
  }
}
