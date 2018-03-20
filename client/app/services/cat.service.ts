import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Cat } from '../shared/models/cat.model';

@Injectable()
export class CatService {

  constructor(private http: HttpClient) { }
//figure out how to add username here
  getCats(userName): Observable<Cat[]> {
    return this.http.get<Cat[]>('/api/cats/' + userName);
  }

  countCats(): Observable<number> {
    return this.http.get<number>('/api/cats/count');
  }

  addCat(cat: Cat): Observable<Cat> {
	  console.log(cat);
    return this.http.post<Cat>('/api/cat', cat);
  }

  getCat(cat: Cat): Observable<Cat> {
    return this.http.get<Cat>(`/api/cat/${cat._id}`);
  }

  editCat(cat: Cat): Observable<string> {
    return this.http.put(`/api/cat/${cat._id}`, cat, { responseType: 'text' });
  }

  deleteCat(cat: Cat): Observable<string> {
    return this.http.delete(`/api/cat/${cat._id}`, { responseType: 'text' });
  }

}
