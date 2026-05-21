import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// NG-ZORRO Imports
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CreancierService } from 'src/app/core/services/creancier.service';
import { Creancier,CreateCreancier } from 'src/app/core/models/creancier.model';
import { NzDividerComponent } from "ng-zorro-antd/divider";



@Component({
  selector: 'app-creancier-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzIconModule,
    NzTagModule,
    NzSpaceModule,
    NzTableModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzDividerComponent
], 
  templateUrl: './creancier-list.component.html',
  styleUrls: ['./creancier-list.component.css']
})
export class CreancierListComponent implements OnInit {
  
  private readonly creancierService = inject(CreancierService);
  private readonly fb = inject(FormBuilder); // Used to build the form

  creanciers: Creancier[] = [];
  validateForm!: FormGroup; // Declare the form group

  ngOnInit(): void {
    // 1. Initialize the form and its validation rules
    this.validateForm = this.fb.group({
      nom: [null, [Validators.required]],
      typeCreancier: [null, [Validators.required]],
      ice: [null, [Validators.required]],
      banque: [null],
      rib: [null],
      email: [null, [Validators.email]],
      telephone: [null],
      adresse: [null]
    });

    // 2. Fetch the table data
    this.fetchCreanciers();
  }

  fetchCreanciers(): void {
    this.creancierService.getAllCreancier().subscribe({
      next: (data: any) => { 
        this.creanciers = data.content ? data.content : data;
      },
      error: (error) => console.error('Error fetching creanciers!', error)
    });
  }

  // Handle form submission
  submitForm(): void {
    if (this.validateForm.valid) {
      
      // 1. Extract the values from the form and cast them to your new interface
      const payload: CreateCreancier = this.validateForm.value;

      // 2. Call the service to save to the database
      this.creancierService.createCreancier(payload).subscribe({
        next: (response) => {
          console.log('Créancier créé avec succès:', response);
          
          // 3. Reset the form to make it blank again
          this.validateForm.reset();
          
          // 4. Refresh the table to show the newly added Créancier
          this.fetchCreanciers();
        },
        error: (error) => {
          console.error('Erreur lors de la création du créancier!', error);
        }
      });

    } else {
      // Show red validation errors if the user forgot a required field
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}