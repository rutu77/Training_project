import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generic-list',
  standalone: false,
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.css'
})
export class GenericListComponent<T> implements OnInit{

  @Input() items: T[] = [];
  @Input() itemFields: string[] = [];
  @Input() itemLabels: string[] = [];

  @Output() addItem = new EventEmitter<void>();
  @Output() updateItem = new EventEmitter<number>();
  @Output() deleteItem = new EventEmitter<number>();

  filteredItems:T[]=[];
  searchText:string=''

  constructor() {}

  ngOnInit(): void {
  // console.log(this.itemFields);
    this.filteredItems= [...this.items]
  }

  ngOnChanges(){
    this.filteredItems=[...this.items]
  }

  getFieldValue(item:any, fieldPath:string){
    return fieldPath.split('.').reduce((obj,key)=>obj?.[key],item);
  }

  filterItems(){
    const searchValue= this.searchText.toLowerCase()
    this.filteredItems= this.items.filter(item=>{
      return this.itemFields.some(field=>{
        const value= this.getFieldValue(item,field);
        return value?.toString().toLowerCase().includes(searchValue)
      })
    })
  }

  openUpdateDialog(itemId: number) {
    this.updateItem.emit(itemId);
  }


  openAddDialog() {
    this.addItem.emit();
  }
  


  confirmDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteItem.emit(id);
        Swal.fire({
          title: 'Deleted',
          text: "Your item has been deleted",
          icon: 'success',
        });
      }
    });
  }
}


