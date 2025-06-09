import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.css'],
  imports:[CommonModule, FormsModule]
})
export class MilestonesComponent implements OnInit {
  milestones: any[] = [];
  editingIndex: number | null = null;
  newMilestone = { title: '', location: '', year: '', image: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const localData = localStorage.getItem('milestones');
    if (localData) {
      this.milestones = JSON.parse(localData);
    } else {
      this.http.get<any[]>('assets/data/milestones.json').subscribe(data => {
        this.milestones = data;
        localStorage.setItem('milestones', JSON.stringify(data));
      });
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('milestones', JSON.stringify(this.milestones));
  }

  deleteMilestone(index: number) {
    this.milestones.splice(index, 1);
    this.saveToLocalStorage();
  }

  startEdit(index: number) {
    this.editingIndex = index;
  }

  saveEdit(index: number) {
    this.editingIndex = null;
    this.saveToLocalStorage();
  }

  addMilestone() {
    if (this.newMilestone.title.trim()) {
      this.milestones.push({ ...this.newMilestone });
      this.newMilestone = { title: '', location: '', year: '', image: '' };
      this.saveToLocalStorage();
    }
  }
  revertToOriginal() {
  localStorage.removeItem('milestones');
  this.http.get<any[]>('assets/data/milestone.json').subscribe(data => {
    this.milestones = data;
    localStorage.setItem('milestones', JSON.stringify(data));
  });
  this.editingIndex = null;
  this.newMilestone = { title: '', location: '', year: '', image: '' };
  }
}
