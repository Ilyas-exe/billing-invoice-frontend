import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Creancier } from '../models/creancier.model';

@Injectable({
  providedIn: 'root'
})

export class CreancierService{
    private readonly http = inject(HttpClient);

    getAllCreancier():Observable<Creancier[]>{
        return this.http.get<Creancier[]>('http://localhost:8080/api/creanciers/search')
    }

}