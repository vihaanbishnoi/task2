import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  position: string;
  description: string;
  email?: string;
  phone?: string;
  image?: string;
  experience?: string;
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  imports: [FormsModule, CommonModule]
})
export class TeamComponent implements OnInit {
  teamMembers: TeamMember[] = [];
  editMode: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('team');
    if (stored) {
      this.teamMembers = JSON.parse(stored);
    } else {
      this.http.get<TeamMember[]>('assets/data/team.json').subscribe(data => {
        this.teamMembers = data;
        localStorage.setItem('team', JSON.stringify(data));
      });
    }
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
  }

  updateTeam(): void {
    localStorage.setItem('team', JSON.stringify(this.teamMembers));
    this.editMode = false;
    alert('Team updated!');
  }

  resetToOriginal(): void {
    this.http.get<TeamMember[]>('assets/data/team.json').subscribe(data => {
      this.teamMembers = data;
      localStorage.setItem('team', JSON.stringify(data));
      this.editMode = false;
      alert('Reverted to original team!');
    });
  }

  deleteTeamMember(index: number): void {
    this.teamMembers.splice(index, 1);
    localStorage.setItem('team', JSON.stringify(this.teamMembers));
  }

  addTeamMember(): void {
    this.teamMembers.push({
      name: '',
      position: '',
      description: '',
      email: '',
      phone: '',
      image: '',
      experience: ''
    });
  }
}