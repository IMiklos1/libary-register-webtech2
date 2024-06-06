import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ItemDto } from '../models/item-dto.model';
import { ItemWithRenterDto } from '../models/items-with-renter.model';
import { UserDto } from '../models/user-dto.model';
import { ItemService } from '../services/item.service';
import { UserService } from '../services/user.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-expired-return',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    MatSelectModule,
    AsyncPipe,
    MatAutocompleteModule,
    MatOption,
    CommonModule],
  templateUrl: './expired-return.component.html',
  styleUrl: './expired-return.component.css'
})
export class ExpiredReturnComponent implements OnInit {
  daysControl: FormControl = new FormControl(10);
  
  displayedColumns: string[] = [
    'id',
    'number',
    'type',
    'author',
    'title',
    'procurementDate',
    'renterName', // Added column for renter's name
    'address',
    'phone',
    'idCard',
    'renterStatus',
    'startRent',
    'expiredWith',
  ];
  dataSource: MatTableDataSource<ItemWithRenterDto> = new MatTableDataSource<ItemWithRenterDto>([]);;
  
  users: UserDto[] = [];
  items: ItemDto[] = [];
  itemsWithRenter: ItemWithRenterDto[] = [];
  
  constructor(private itemService: ItemService, private userService: UserService) {
    this.getUsers();
    this.getItems();
  }
  
  ngOnInit(): void {
    this.fetchData();
    this.daysControl.valueChanges.subscribe(() => {
      this.fetchData();
    });
  }
  
  getUsers(): void {
    this.userService.getAll().subscribe({
      next: (users) => {
        this.users = users;
        this.fetchData();
      }
    });
  }
  
  getItems(): void {
    this.itemService.getAll()
    .subscribe({
      next: (data) => {
        this.items = data;
        this.fetchData();
      }
    });
  }
  
  fetchData(): void {
    if (!this.items || !this.users) {
      return;
    }

    let selectedDays = this.daysControl.value;

    this.itemsWithRenter = this.items
      .filter(item => item.renterId)
      .map(item => {
        const renter = this.users.find(user => user._id === item.renterId) || null;

        let itemWithRenter: ItemWithRenterDto = {
          ...item,
          renter: renter ? { ...renter } : null,
        };
        console.log(selectedDays + " " + " " + itemWithRenter.startRent.toString() + " " + this.compareDateWithDays(selectedDays, itemWithRenter.startRent.toString()));
        itemWithRenter.differenceWithAddedDate = this.compareDateWithDays(selectedDays, itemWithRenter.startRent.toString());

        return itemWithRenter;
      }).filter(i => i.differenceWithAddedDate! > 0);

    this.dataSource.data = this.itemsWithRenter;
  }

  compareDateWithDays(numberOfDays: number, dateToCheck: string): number {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - numberOfDays);
    let dateToCheckObj = new Date(dateToCheck);

    if (!(dateToCheckObj instanceof Date && !isNaN(dateToCheckObj.getTime()))) {
      return -1;
    }

    let differenceInMilliseconds = currentDate.getTime() - dateToCheckObj.getTime();
    let daysDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    return daysDifference;
  }    
    
}
