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
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid'; // <-- FIX: Added this to make nz-row and nz-col work!

import { CreancierService } from 'src/app/core/services/creancier.service';
import { Creancier, CreateCreancier, CreancierSearchCriteria } from 'src/app/core/models/creancier.model';

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
    NzModalModule,
    NzGridModule // <-- FIX: Registered here
  ], 
  templateUrl: './creancier-list.component.html',
  styleUrls: ['./creancier-list.component.css']
})
export class CreancierListComponent implements OnInit {
  
  private readonly creancierService = inject(CreancierService);
  private readonly fb = inject(FormBuilder);

  creanciers: Creancier[] = [];
  
  validateForm!: FormGroup;
  searchForm!: FormGroup;

  isAddModalVisible = false;
  isConfirmLoading = false;

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      nom: [null],
      banque: [null],
      rib: [null],

    });

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

  onSearch(): void {
    const criteria: CreancierSearchCriteria = this.searchForm.value;
    this.creancierService.getAllCreancier(criteria).subscribe({
      next: (data: any) => {
        this.creanciers = data.content ? data.content : data;
      },
      error: (err) => console.error('Erreur de recherche', err)
    });
  }

  resetSearch(): void {
    this.searchForm.reset();
    this.fetchCreanciers();
  }

  showAddModal(): void {
    this.isAddModalVisible = true;
  }

  handleAddCancel(): void {
    this.isAddModalVisible = false;
    this.validateForm.reset();
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isConfirmLoading = true;
      const payload: CreateCreancier = this.validateForm.value;

      this.creancierService.createCreancier(payload).subscribe({
        next: (response) => {
          this.isConfirmLoading = false;
          this.isAddModalVisible = false;
          this.validateForm.reset();
          this.fetchCreanciers();
        },
        error: (error) => {
          this.isConfirmLoading = false;
          console.error('Erreur lors de la création du créancier!', error);
        }
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}