import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Product {
  title: string;
  description: string;
  style: string;
}

interface ProductData {
  products: Product[];
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  originalProducts: Product[] = [];
  editMode = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOriginalProducts();
  }

  loadOriginalProducts(): void {
    this.http.get<ProductData>('assets/data/products.json').subscribe({
      next: (data) => {
        this.originalProducts = data.products;
        const localData = localStorage.getItem('products');
        this.products = localData
          ? JSON.parse(localData).products || []
          : JSON.parse(JSON.stringify(data.products));
        this.saveToLocalStorage(); // optional: to initialize local copy
      },
      error: (err) => {
        console.error('Failed to load product data:', err);
      }
    });
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
  }

  saveProducts(): void {
    this.saveToLocalStorage();
    this.editMode = false;
    alert('Changes saved to local storage.');
  }

  revertProducts(): void {
    if (confirm('Are you sure you want to discard all changes?')) {
      this.products = JSON.parse(JSON.stringify(this.originalProducts));
      this.saveToLocalStorage();
      this.editMode = false;
      alert('Changes reverted to original data.');
    }
  }

  addProduct(): void {
    this.products.push({
      title: 'New Product',
      description: 'Enter description...',
      style: 'bg-body-tertiary'
    });
  }

  deleteProduct(index: number): void {
    if (confirm('Delete this product?')) {
      this.products.splice(index, 1);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('products', JSON.stringify({ products: this.products }));
  }
}
