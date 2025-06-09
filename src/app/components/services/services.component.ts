import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Service {
  title: string;
  description: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  imports:[FormsModule, CommonModule]
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  originalServices: Service[] = [];
  editMode: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('services');
    if (stored) {
      this.services = JSON.parse(stored);
    } else {
      this.http.get<Service[]>('assets/data/services.json').subscribe(data => {
        this.services = data;
        localStorage.setItem('services', JSON.stringify(data));
      });
    }
    this.http.get<Service[]>('assets/data/services.json').subscribe(data => {
      this.originalServices = data;
    });
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
  }

  updateServices(): void {
    localStorage.setItem('services', JSON.stringify(this.services));
    this.editMode = false;
    alert('Services updated!');
  }

  resetToOriginal(): void {
    this.http.get<Service[]>('assets/data/services.json').subscribe(data => {
      this.services = data;
      localStorage.setItem('services', JSON.stringify(data));
      this.editMode = false;
      alert('Reverted to original services!');
    });
  }

  deleteService(index: number): void {
    this.services.splice(index, 1);
    localStorage.setItem('services', JSON.stringify(this.services));
  }

  addService(): void {
    this.services.push({ title: '', description: '', link: '#', icon: '' });
  }

  hasChangesFromOriginal(): boolean {
    return JSON.stringify(this.services) !== JSON.stringify(this.originalServices);
  }
}