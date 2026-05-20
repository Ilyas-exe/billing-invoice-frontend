import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for formatting dates
import { NzTableModule } from 'ng-zorro-antd/table'; // 1. Import the Zorro Table Module
import { Creancier } from 'src/app/core/models/creancier.model';
import { CreancierService } from 'src/app/core/services/creancier.service';


@Component({
  selector: 'app-creancier-list',
  standalone: true,
  // 2. Add NzTableModule and CommonModule to your imports
  imports: [CommonModule, NzTableModule], 
  templateUrl: './creancier-list.component.html',
  styleUrls: ['./creancier-list.component.css']
})
export class CreancierListComponent implements OnInit {
  
  private readonly creancierService = inject(CreancierService);
  creanciers: Creancier[] = [];

  ngOnInit(): void {
    this.fetchCreanciers();
  }

  fetchCreanciers(): void {
    this.creancierService.getAllCreancier().subscribe({
      next: (data: any) => { 
        if (data && data.content) {
            this.creanciers = data.content;
        } else {
            this.creanciers = data; 
        }
      },
      error: (error: any) => console.error('Error fetching creanciers!', error)
    });
  }
}