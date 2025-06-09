import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ContactInfo {
  pageTitle: string;
  pageSubtitle: string;
  office: {
    address: string;
    phone: string;
    email: string;
  };
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [FormsModule, CommonModule]
})
export class ContactComponent implements OnInit {
  contact: ContactInfo = {
    pageTitle: 'Contact Us',
    pageSubtitle: 'Get in touch with our team',
    office: {
      address: '',
      phone: '',
      email: ''
    }
  };

  originalContact: ContactInfo = {
    pageTitle: '',
    pageSubtitle: '',
    office: {
      address: '',
      phone: '',
      email: ''
    }
  };

  editMode: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Load contact data from localStorage or JSON file
    const stored = localStorage.getItem('contact');
    if (stored) {
      this.contact = JSON.parse(stored);
    } else {
      this.http.get<ContactInfo>('assets/data/contact.json').subscribe(data => {
        this.contact = data;
        localStorage.setItem('contact', JSON.stringify(data));
      });
    }

    // Load original contact data for comparison
    this.http.get<ContactInfo>('assets/data/contact.json').subscribe(data => {
      this.originalContact = JSON.parse(JSON.stringify(data)); // Deep copy
    });
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
  }

  updateContact(): void {
    localStorage.setItem('contact', JSON.stringify(this.contact));
    this.editMode = false;
    alert('Contact information updated successfully!');
  }

  revertToOriginal(): void {
    this.contact = JSON.parse(JSON.stringify(this.originalContact)); // Deep copy
    localStorage.setItem('contact', JSON.stringify(this.contact));
    this.editMode = false;
    alert('Contact information reverted to original!');
  }

  hasChangesFromOriginal(): boolean {
    return JSON.stringify(this.contact) !== JSON.stringify(this.originalContact);
  }
}