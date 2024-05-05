import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserDto } from '../models/user-dto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  path = "http://localhost:3000";
  
  http = inject(HttpClient);
  
  constructor() {}

  getAll() : Observable<UserDto[]>{
    return this.http.get<UserDto[]>(this.path + '/api/user');    
  }

  getOne(id: number) {
    return this.http.get<UserDto>(this.path + '/api/user/' + id);    
  }

  create(user: UserDto) {
    return this.http.post<UserDto>(this.path + '/api/user', user);
  }

  update(user: UserDto) {
    return this.http.put<UserDto>(this.path + '/api/user', user);
  }

  delete(user: UserDto) {
    return this.http.delete(this.path + '/api/user/'); 
  }
}
