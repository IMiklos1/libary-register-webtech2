import { Component, OnInit } from '@angular/core';
import { ItemDto } from '../models/item-dto.model';
import { UserDto } from '../models/user-dto.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ItemWithRenterDto } from '../models/items-with-renter.model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RegisterService } from '../services/register.service';
import { UserService } from '../services/user.service';
import { ItemService } from '../services/item.service';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    MatSelectModule,
    AsyncPipe,
    MatAutocompleteModule,
    MatOption,
    CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

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
    'renterStatus'
  ];
  dataSource: MatTableDataSource<ItemWithRenterDto>;

  users: UserDto[];
  items: ItemDto[];
  itemsWithRenter: ItemWithRenterDto[];

  userSearchControl = new FormControl();
  addRentingUser: UserDto[];
  filteredUsers: Observable<UserDto[]> = new Observable<UserDto[]>;
  
  itemSearchControl = new FormControl();
  addRentedItem: ItemDto[];
  filteredItems: Observable<ItemDto[]> = new Observable<ItemDto[]>;
  

  reservedItemSearchControl = new FormControl();
  reservedItems: ItemDto[];
  filteredRecivedItems: Observable<ItemDto[]> = new Observable<ItemDto[]>;

  constructor(private registerService: RegisterService, private userService: UserService, private itemService: ItemService, public authService:AuthService) {
    this.users = [];
    this.items = [];
    this.getUsers();
    this.getItems();
    this.itemsWithRenter = [];
    this.dataSource = new MatTableDataSource<ItemWithRenterDto>([]);
    // this.selectedUser = this.users[0];
    // this.selectedItem = this.items[0];
    this.addRentingUser = [];
    this.addRentedItem = [];
    this.reservedItems = [];

    this.resetOptions();
  }

  resetOptions(){
    this.filteredUsers = this.userSearchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._userFilter(value))
    );

    this.filteredItems = this.itemSearchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._itemFilter(value))
    );

    this.filteredRecivedItems = this.reservedItemSearchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._reservedItemFilter(value)) 
    );
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private _userFilter(value: string | null): UserDto[] {
    const filterValue = (value || '').toLowerCase().trim();

    if (!filterValue) {
      return this.addRentingUser;
    }

    return this.addRentingUser.filter(user =>
      user.name.toLowerCase().includes(filterValue) ||
      user.address.toLowerCase().includes(filterValue) ||
      user.idCard.toLowerCase().includes(filterValue)
    );
  }

  private _itemFilter(value: string | null): ItemDto[] {
    const filterValue = (value || '').toLowerCase().trim();

    if (!filterValue) {
      return this.addRentedItem;
    }

    return this.addRentedItem.filter(item =>
      item.title.toLowerCase().includes(filterValue) ||
      item.author.toLowerCase().includes(filterValue) ||
      item.type.toLowerCase().includes(filterValue)
    );
  }

  private _reservedItemFilter(value: string | null): ItemDto[] {
    const filterValue = (value || '').toLowerCase().trim();

    if (!filterValue) {
      return this.reservedItems;
    }

    return this.reservedItems.filter(item =>
      item.title.toLowerCase().includes(filterValue) ||
      item.author.toLowerCase().includes(filterValue) ||
      item.type.toLowerCase().includes(filterValue)
    );
  }

  displayFnUser(user: UserDto): string {
    return user && user.name ? user.name : '';
  }
  displayFnItem(item: ItemDto): string {
    return item && item.title ? item.title : '';
  }
  displayFnReservedItem(item: ItemDto): string {
    return item && item.title ? item.title : '';
  }

  getUserRentCount(selectedUser: UserDto): number {
    if (!selectedUser) return 0;
    return this.items.filter(item => +item.renterId === +selectedUser.id).length;
  }
  onUserInput() {
    if (!this.userSearchControl.value) {
      this.filteredUsers = this.userSearchControl.valueChanges.pipe(
        startWith(''),
        map(value => this._userFilter(value))
      );
    }
  }

  onItemInput() {
    if (!this.itemSearchControl.value) {
      this.filteredItems = this.itemSearchControl.valueChanges.pipe(
        startWith(''),
        map(value => this._itemFilter(value))
      );
    }
  }

  onRecivedItemInput() {
    if (!this.reservedItemSearchControl.value) {
      this.filteredRecivedItems = this.reservedItemSearchControl.valueChanges.pipe(
        startWith(''),
        map(value => this._reservedItemFilter(value))
      );
    }
  }

  getUsers(): void {
    this.userService.getAll()
      .subscribe({
        next: (users) => {
          this.users = users;
          this.fetchData();
          this.addRentingUser = this.users.filter(u => u.status === "active");
          this.resetOptions();
        },
      }
      );
  }

  getItems(): void {
    this.itemService.getAll()
      .subscribe({
        next: (data) => {
          console.log("items has been updated")
          this.items = data;
          this.addRentedItem = this.items.filter(i => i.status.toLowerCase() === "free");
          this.reservedItems = this.items.filter(i => i.status.toLowerCase() === "reserved");
          this.fetchData();
          this.resetOptions();
        }
  });
  }

  fetchData(): void {
    if (!this.items || !this.users) {
      return;
    }
    this.itemsWithRenter = this.items
      .filter(item => item.renterId > 0)
      .map(item => {
        const renter = this.users.find(user => +user.id === +item.renterId) || null;

        const itemWithRenter: ItemWithRenterDto = {
          ...item,
          renter: renter ? { ...renter } : null
        };

        return itemWithRenter;
      });

    this.dataSource.data = this.itemsWithRenter;
  }

  addNewRent() {
    let updateItem: ItemDto = this.itemSearchControl.value;
    let chosenUser: UserDto = this.userSearchControl.value;

    // Check if both item and user are selected
    if (!updateItem || !chosenUser) {
      console.error('Please select both a user and an item.');
      return;
    }

    // Check if the chosen user has more than 6 items
    let userItemsCount: number = this.items.filter(item => item.renterId === chosenUser.id).length;
    if (userItemsCount >= 6) {
      console.error('The selected user already has 6 or more items rented.');
      return;
    }

    // Update the item data
    updateItem.renterId = chosenUser.id;
    updateItem.startRent = new Date();
    updateItem.status = "reserved";

    console.log('Updating item:', updateItem);

    // Call the service to update the item
    this.itemService.update(updateItem).subscribe(
      () => {
        console.log('Item updated successfully.');
        this.getItems();
      },
      (error) => {
        console.error('Error updating item:', error);
      }
      );
      this.fetchData();
    this.itemSearchControl.setValue(null);
    this.userSearchControl.setValue(null);
  }

  recivedItem(){
    let itemToSetFree: ItemDto = this.reservedItemSearchControl.value;
    if(!itemToSetFree){
      console.log("Please select item to set free!");
      return;
    }
    itemToSetFree.renterId = 0;
    itemToSetFree.status = "Free";
    itemToSetFree.startRent = new Date(0);

    this.itemService.update(itemToSetFree).subscribe({
      next:() => {
        console.log('Item updated successfully.');
        this.getItems();
      }
    });
    this.fetchData();
    this.reservedItemSearchControl.setValue(null);
  }
}
