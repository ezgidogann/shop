import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Product } from '../product';
import {Category} from "../../category/category";
import {CategoryService} from "../../service/category.service";
import {ProductService} from "../../service/product.service";
import {AlertifyService} from "../../service/alertify.service";


@Component({
  selector: 'app-product-add-forms2',
  templateUrl: './product-add-forms2.component.html',
  styleUrls: ['./product-add-forms2.component.css'],
  providers:[CategoryService,ProductService]
})
export class ProductAddForms2Component implements OnInit {

  constructor(private formBuilder:FormBuilder,
              private categoryService:CategoryService,
              private productService : ProductService,
              private alertifyService :AlertifyService) { }

  productAddForm!:FormGroup;
  product:Product = new Product();
  categories!: Category[];
  model: any;

  createProductAddForm(){
    this.productAddForm = this.formBuilder.group({
      name: ["",Validators.required],
      description: ["",Validators.required],
      imgUrl: ["",Validators.required],
      price: ["",Validators.required],
      categoryId: ["",Validators.required]
    })
  }
  ngOnInit(): void {
    this.categoryService.getCategory().subscribe(data => {
      this.categories = data
    });
    this.createProductAddForm();
  }
 add(){
    if(this.productAddForm.valid){
      this.product = Object.assign({},this.productAddForm.value)
    }
   this.productService.addProduct(this.product).subscribe(data => {
     this.alertifyService.success(data.name + " başarıyla eklendi.")
   });
 }
}
