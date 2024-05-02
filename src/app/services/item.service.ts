import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ItemDto } from '../models/item-dto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  path = "http://localhost:3000";
  constructor() { }

  http = inject(HttpClient);

  getAll(): Observable<ItemDto[]>{
    return this.http.get<ItemDto[]>(this.path + '/api/item');    
  }

  getOne(id: number) {
    return this.http.get<ItemDto>(this.path + '/api/item/' + id);    
  }

  create(item: ItemDto) {
    return this.http.post<ItemDto>(this.path + '/api/item', item);
  }

  update(item: ItemDto) {
    return this.http.put<ItemDto>(this.path + '/api/item', item);
  }

  delete(id: number) {
    return this.http.delete(this.path + '/api/item/' + id); 
  }
}
