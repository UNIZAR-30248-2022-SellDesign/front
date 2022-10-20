import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [
    {productName:"Sudadera",designName:"buah",price:10,image:"https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530"},
    {productName:"Sudadera",designName:"buah",price:20,image:"https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530"},
    {productName:"Sudadera",designName:"buah",price:30,image:"https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530"},
    {productName:"Sudadera",designName:"buah",price:40,image:"https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530"},
    {productName:"Sudadera",designName:"buah",price:50,image:"https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530"},
    {productName:"Sudadera",designName:"buah",price:60,image:"https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530"},
    {productName:"Sudadera",designName:"buah",price:70,image:"https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530"},
    {productName:"Sudadera",designName:"buah",price:80,image:"https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530"}
  ];

  newProducts: Product[] = []

  constructor() { }

  ngOnInit(): void {
    this.getMore()
  }

  getMore() {
    this.newProducts = this.newProducts.concat(this.products)
    console.log(this.newProducts)
  }

}
