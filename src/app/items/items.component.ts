import { Component, inject, ViewChild } from '@angular/core';
import { ItemDto } from '../models/item-dto.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  displayedColumns: string[] = [
    'id',
    'number',
    'type',
    'author',
    'title',
    'procurementDate',
    'status'
  ];
  dataSource: MatTableDataSource<ItemDto>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  items: ItemDto[];
  itemForm: FormGroup;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  discardId: string;
  updateItem: any;

  constructor(private itemService: ItemService,
    private formBuilder: FormBuilder, public authService:AuthService) {
    this.items = [];
    this.getItems();
    this.itemForm = this.formBuilder.group<ItemDto>({
      _id: '',
      number: '',
      type: '',
      author: '',
      title: '',
      procurementDate: new Date(0),
      status: '',
      renterId: '',
      startRent: new Date(0),
    });

    this.dataSource = new MatTableDataSource(this.items);
    console.log(this.dataSource);

    this.discardId = '';
    this.updateItem = this.items[0];
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

  getItems(): void {
    this.itemService.getAll()
      .subscribe({
        next: (data) => {
          console.log(data);
          this.items = data;
          this.dataSource.data = this.items;
        }
      });
  }

  async onSubmit() {
    if (this.itemForm.valid) {
      console.log(this.itemForm);
      const itemData: ItemDto = this.itemForm.value;
      console.log(itemData);
      this.itemService.create(itemData).subscribe({
        next: (itemCreated) => {
          this.router.navigateByUrl('/items');
          this.itemForm.reset();
          this.getItems();
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {
      console.log("ide lehet kellene csinálni vaalami popupot ha lesz idő :)");
    }
  }
  async discardItem() {

    console.log(this.discardId);
    if (this.items.find(u => u._id === this.discardId)) {

      this.updateItem = this.items.find(u => u._id === this.discardId);
      this.updateItem.status = "scrapped";

      console.log(this.updateItem);
      this.itemService.update(this.updateItem).subscribe();

    }
  }
}
