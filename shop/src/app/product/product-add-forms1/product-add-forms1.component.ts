import { Component, OnInit } from '@angular/core';
import {Product} from "../product";
import {CategoryService} from "../../service/category.service";
import {Category} from "../../category/category";
import {NgForm} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {AlertifyService} from "../../service/alertify.service";

@Component({
  selector: 'app-product-add-forms1',
  templateUrl: './product-add-forms1.component.html',
  styleUrls: ['./product-add-forms1.component.css'],
  providers:[CategoryService]
})
export class ProductAddForms1Component implements OnInit {

  constructor(private categoryService:CategoryService,
              private productService:ProductService,
              private alertifyService:AlertifyService) { }
  model : Product = new Product();
  categories!: Category[];

  ngOnInit(): void {

      this.categoryService.getCategory().subscribe(data => {
      this.categories = data
    });
  }

  add(form:NgForm){
    this.productService.addProduct(this.model).subscribe(data => {
   this.alertifyService.success(data.name + " başarıyla eklendi.")
 });
  }

}
