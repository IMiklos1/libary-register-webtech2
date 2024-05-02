import { Component, inject, NgModule } from '@angular/core';
import { UserDto } from '../models/user-dto.model';
import { UserService } from '../services/user.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    FormsModule],
    templateUrl: './users.component.html',
    styleUrl: './users.component.css'
  })
  export class UsersComponent implements AfterViewInit{
    
    displayedColumns: string[] = ['id', 'name', 'address', 'phone', 'idCard', 'status'];
    dataSource: MatTableDataSource<UserDto>;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
    users: UserDto[];
    userForm: FormGroup;
    
    router = inject(Router);
    activatedRoute = inject(ActivatedRoute);
    
    deleteId: string;
    updateUser:any;
    
  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    public authService: AuthService) {
    this.users = [];
    this.getUsers();
    this.userForm = this.formBuilder.group<UserDto>({
      id: 0,
      name: '',
      address: '',
      phone: '',
      idCard: '',
      status: 'active'
    });

    this.dataSource = new MatTableDataSource(this.users);
    console.log(this.dataSource);

    this.deleteId = '';
    this.updateUser = this.users[0];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsers(): void {
    this.userService.getAll()
      .subscribe({
        next: (users) =>{
          this.users = users;
          this.dataSource.data = this.users;
        }
      }
        // (data) => {
        //   this.users = data;
        //   this.dataSource.data = this.users;
        // },
        // (error) => {
        //   console.log(error);
        // }
      );
  }

  async onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm);
      const userData: UserDto = this.userForm.value;
      userData.id = 1;
      userData.status = "active"
      this.userService.create(userData).subscribe({
        next: (userCreated) => {
          this.dataSource.data = this.users
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {
      console.log("ide lehet kellene csinálni vaalami popupot ha lesz idő :)");
    }
    console.log(this.users);
    this.userForm.reset();
  }
  async deleteUser(){
    
    console.log(this.deleteId);
    if(this.users.find(u => u.id === +this.deleteId)){

      this.updateUser = this.users.find(u => u.id === +this.deleteId);
      this.updateUser.status = "inactive";

      console.log(this.updateUser);
      this.userService.update(this.updateUser).subscribe();

    }
  }

}
