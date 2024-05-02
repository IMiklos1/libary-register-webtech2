import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ItemDto } from '../models/item-dto.model';
import { ItemWithRenterDto } from '../models/items-with-renter.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  http = inject(HttpClient);

  getAll() {
    return this.http.get<ItemWithRenterDto[]>('/api/itemWithRenter');    
  }

  getOne(id: number) {
    return this.http.get<ItemWithRenterDto>('/api/itemWithRenter/' + id);    
  }

  create(item: ItemWithRenterDto) {
    return this.http.post<ItemWithRenterDto>('/api/itemWithRenter', item);
  }

  update(item: ItemWithRenterDto) {
    return this.http.put<ItemWithRenterDto>('/api/itemWithRenter', item);
  }

  delete(id: number) {
    return this.http.delete('/api/itemWithRenter/' + id); 
  }
}
