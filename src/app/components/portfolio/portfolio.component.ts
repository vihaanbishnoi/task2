import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface PortfolioItem {
  title: string;
  subtitle: string;
  description: string;
  layout: 'image-right' | 'image-left';
  imagePlaceholder: string;
}

interface PortfolioData {
  portfolioItems: PortfolioItem[];
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  imports: [FormsModule, CommonModule]
})
export class PortfolioComponent implements OnInit {
  portfolioItems: PortfolioItem[] = [];
  originalPortfolioItems: PortfolioItem[] = [];
  editMode: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPortfolio();
  }

  loadPortfolio(): void {

    const storedPortfolio = localStorage.getItem('portfolio');
    
    if (storedPortfolio) {

      const data = JSON.parse(storedPortfolio);
      this.portfolioItems = data.portfolioItems || [];
    } else {

      this.http.get<PortfolioData>('assets/data/portfolio.json').subscribe({
        next: (data) => {
          this.portfolioItems = data.portfolioItems || [];
          this.saveToLocalStorage();
        },
        error: (error) => {
          console.error('Error loading portfolio from JSON file:', error);
          console.log('Make sure assets/data/portfolio.json exists with the correct structure');

          this.portfolioItems = [];
        }
      });
    }


    this.http.get<PortfolioData>('assets/data/portfolio.json').subscribe({
      next: (data) => {
        this.originalPortfolioItems = data.portfolioItems || [];
      },
      error: (error) => {
        console.error('Error loading original portfolio from JSON file:', error);
        this.originalPortfolioItems = [];
      }
    });
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
  }

  savePortfolio(): void {
    this.saveToLocalStorage();
    this.editMode = false;
    alert('Portfolio saved successfully!');
  }

  resetPortfolio(): void {
    if (confirm('Are you sure you want to reset all portfolio items to original? This will lose all your changes.')) {
      this.portfolioItems = JSON.parse(JSON.stringify(this.originalPortfolioItems));
      this.saveToLocalStorage();
      this.editMode = false;
      alert('Portfolio reset to original!');
    }
  }

  addPortfolioItem(): void {
    const newItem: PortfolioItem = {
      title: 'New Project',
      subtitle: 'Project Subtitle',
      description: 'Enter project description here...',
      layout: 'image-right',
      imagePlaceholder: '500x500'
    };
    this.portfolioItems.push(newItem);
  }

  deletePortfolioItem(index: number): void {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
      this.portfolioItems.splice(index, 1);
    }
  }

  getContentColumnClass(item: PortfolioItem): string {
    return item.layout === 'image-left' ? 'col-md-7 order-md-2' : 'col-md-7';
  }

  getImageColumnClass(item: PortfolioItem): string {
    return item.layout === 'image-left' ? 'col-md-5 order-md-1' : 'col-md-5';
  }

  private saveToLocalStorage(): void {
    const data: PortfolioData = {
      portfolioItems: this.portfolioItems
    };
    localStorage.setItem('portfolio', JSON.stringify(data));
  }
}
