import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NzButtonModule, NzLayoutModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
