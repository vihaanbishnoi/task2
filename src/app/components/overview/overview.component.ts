import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface OverviewData {
  heading: string;
  paragraph1: string;
  paragraph2: string;
  image: string;
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  imports: [FormsModule, CommonModule]
})
export class OverviewComponent implements OnInit {
  overview: OverviewData = {
    heading: '',
    paragraph1: '',
    paragraph2: '',
    image: ''
  };

  originalOverview: OverviewData = {
    heading: '',
    paragraph1: '',
    paragraph2: '',
    image: ''
  };

  editMode: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // First, load the original data from JSON
    this.http.get<OverviewData>('assets/data/overview.json').subscribe(data => {
      // Store the original data
      this.originalOverview = { ...data };
      
      // Check if there's stored data in localStorage
      const stored = localStorage.getItem('overview');
      if (stored) {
        this.overview = JSON.parse(stored);
      } else {
        // Use original data if no stored data exists
        this.overview = { ...data };
        localStorage.setItem('overview', JSON.stringify(data));
      }
    });
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
  }

  updateOverview(): void {
    localStorage.setItem('overview', JSON.stringify(this.overview));
    this.editMode = false;
    alert('Overview updated successfully!');
  }

  revertToOriginal(): void {
    const confirmRevert = confirm(
      'Are you sure you want to revert to the original data? This will discard all changes and cannot be undone.'
    );
    
    if (confirmRevert) {
      // Reset to original data
      this.overview = { ...this.originalOverview };
      // Update localStorage with original data
      localStorage.setItem('overview', JSON.stringify(this.originalOverview));
      // Exit edit mode
      this.editMode = false;
      alert('Overview reverted to original data!');
    }
  }

  // Helper method to check if current data differs from original
  hasChangesFromOriginal(): boolean {
    return JSON.stringify(this.overview) !== JSON.stringify(this.originalOverview);
  }

  // Helper method to check if current data differs from what's in edit mode
  hasUnsavedChanges(): boolean {
    const stored = localStorage.getItem('overview');
    if (!stored) return false;
    return JSON.stringify(this.overview) !== stored;
  }
}