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
  imports: [FormsModule, CommonModule]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  originalProducts: Product[] = [];
  editMode: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    // Check if products exist in localStorage
    const storedProducts = localStorage.getItem('products');
    
    if (storedProducts) {
      // Load from localStorage
      const data = JSON.parse(storedProducts);
      this.products = data.products || [];
    } else {
      // Load from JSON file
      this.http.get<ProductData>('assets/data/products.json').subscribe({
        next: (data) => {
          this.products = data.products || [];
          this.saveToLocalStorage();
        },
        error: (error) => {
          console.error('Error loading products:', error);
          // Fallback to default products if JSON loading fails
          this.products = this.getDefaultProducts();
          this.saveToLocalStorage();
        }
      });
    }

    // Always load original products from JSON for reset functionality
    this.http.get<ProductData>('assets/data/products.json').subscribe({
      next: (data) => {
        this.originalProducts = data.products || [];
      },
      error: (error) => {
        console.error('Error loading original products:', error);
        this.originalProducts = this.getDefaultProducts();
      }
    });
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
  }

  saveProducts(): void {
    this.saveToLocalStorage();
    this.editMode = false;
    alert('Products saved successfully!');
  }

  resetProducts(): void {
    if (confirm('Are you sure you want to reset all products to original? This will lose all your changes.')) {
      this.products = JSON.parse(JSON.stringify(this.originalProducts));
      this.saveToLocalStorage();
      this.editMode = false;
      alert('Products reset to original!');
    }
  }

  addProduct(): void {
    const newProduct: Product = {
      title: 'New Product',
      description: 'Enter product description here...',
      style: 'bg-body-tertiary'
    };
    this.products.push(newProduct);
  }

  deleteProduct(index: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.products.splice(index, 1);
    }
  }

  private saveToLocalStorage(): void {
    const data: ProductData = {
      products: this.products
    };
    localStorage.setItem('products', JSON.stringify(data));
  }

  private getDefaultProducts(): Product[] {
    return [
      {
        title: 'Web Development',
        description: 'Modern, responsive websites built with the latest technologies.',
        style: 'bg-body-tertiary'
      },
      {
        title: 'Mobile Apps',
        description: 'Native and cross-platform mobile applications for iOS and Android.',
        style: 'text-bg-dark'
      },
      {
        title: 'Cloud Solutions',
        description: 'Scalable cloud infrastructure and deployment solutions.',
        style: 'text-bg-primary'
      },
      {
        title: 'AI & Analytics',
        description: 'Machine learning and data analytics solutions for business insights.',
        style: 'text-bg-secondary'
      }
    ];
  }
}