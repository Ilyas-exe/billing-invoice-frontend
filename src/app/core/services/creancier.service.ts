import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreancierSearchCriteria, Creancier, CreateCreancier } from '../models/creancier.model';

@Injectable({
  providedIn: 'root'
})

export class CreancierService{
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:8080/api/creanciers';

    getAllCreancier(criteria?: CreancierSearchCriteria):Observable<any>{
        let params = new HttpParams()
        if(criteria){
            Object.keys(criteria).forEach(key => {
                const value = (criteria as any)[key]
                if (value !== undefined && value !== null && value !== ''){
                    params = params.set(key,value)
                }
            });
        }
        return this.http.get<any>(`${this.apiUrl}/search`,{ params })
    }
    createCreancier(creancier: CreateCreancier):Observable<Creancier>{
        return this.http.post<Creancier>(this.apiUrl,creancier)
    }
    

}