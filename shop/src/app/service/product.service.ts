import { Injectable } from '@angular/core';
import {Product} from "../product/product";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {tap,catchError} from "rxjs/operators";

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class ProductService {



  constructor(private http:HttpClient) { }
  path = "http://localhost:3000/products"

  // @ts-ignore
  getProducts(categoryId):Observable<Product[]>{

    let newPath = this.path;
    if(categoryId){
      newPath = newPath + "?categoryId="+categoryId
    }

    return this.http
      .get<Product[]>(newPath).pipe(
        tap(data=>console.log(JSON.stringify(data))),
        catchError(this.handleEror)
      );
  }


  addProduct(product:Product):Observable<Product> {

    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type':'application/Json',
        'Authorization':'Token'
      })
    }
    return  this.http.post<Product>(this.path,product,httpOptions).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleEror)
    )
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

