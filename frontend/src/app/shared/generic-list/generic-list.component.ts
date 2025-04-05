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
  @Input() displayUpdateDialog: boolean = false;
  @Input() displayAddDialog: boolean = false;
  @Input() selectedItemId: number | undefined;
  @Input() itemFields: string[] = [];
  @Input() itemLabels: string[] = [];

  @Output() itemUpdated = new EventEmitter<void>();
  @Output() itemAdded = new EventEmitter<void>();
  @Output() itemDeleted = new EventEmitter<number>();
  @Output() cancel = new EventEmitter<void>();

  // New outputs to communicate to parent
  @Output() openUpdate = new EventEmitter<number>();
  @Output() openAdd = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  openUpdateDialog(itemId: number) {
    this.openUpdate.emit(itemId);
  }

  onItemUpdated() {
    this.itemUpdated.emit();
  }

  openAddDialog() {
    this.openAdd.emit();
  }

  onItemAdded() {
    this.itemAdded.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

  deleteItem(itemId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.itemDeleted.emit(itemId);
        Swal.fire({
          title: 'Deleted',
          text: "Your item has been deleted",
          icon: 'success',
        });
      }
    });
  }
}

//   @Input() items:T[]=[];
//   @Input() displayUpdateDialog:boolean= false;
//   @Input() displayAddDialog:boolean= false;
//   @Input() selectedItemId:number| undefined;
//   @Input() itemFields: string[]=[]
//   @Input() itemLabels:string[]=[]

//   @Output() itemUpdated = new EventEmitter<void>();
//   @Output() itemAdded= new EventEmitter<void>();
//   @Output() itemDeleted = new EventEmitter<number>();

//   @Output() cancel= new EventEmitter<void>();
  

//   constructor(){}

//   ngOnInit(): void {
    
//   }

//   openUpdateDialog(itemId: number) {
//     this.selectedItemId = itemId;
//     this.displayUpdateDialog = true;
//   }

//   onItemUpdated(){
//     this.itemUpdated.emit();
//     this.displayUpdateDialog=false
//   }

//   openAddDialog(){
//     this.displayAddDialog= true
//   }

//   onItemAdded(){
//     this.itemAdded.emit()
//     this.displayAddDialog= false;
//   }

//   onCancel(){
//     this.cancel.emit()
//     this.displayUpdateDialog=false;
//     this.displayAddDialog=false;
//   }

//   deleteItem(ItemId:number){
//     Swal.fire({
//       title: 'Are you sure?',
//       text:"You won'nt be able to revert this!",
//       icon:'warning',
//       showCancelButton:true,
//       confirmButtonAriaLabel:"Yes, delete!"
//     }).then((result)=>{
//       if(result.isConfirmed){
//         this.itemDeleted.emit(ItemId);
//         Swal.fire({  
//           title: 'Deleted',
//           text:"Your item has been deleted",
//           icon:'success',
//     })
//   }
//   });
//   }

// }
