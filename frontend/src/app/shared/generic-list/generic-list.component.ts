import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generic-list',
  standalone: false,
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.css'
})
export class GenericListComponent<T> implements OnInit{
  @Input() items:T[]=[];
  @Input() displayUpdateDialog:boolean= false;
  @Input() displayAddDialog:boolean= false;
  @Input() selectedItemId:number| undefined;
  @Input() itemFields: string[]=[]
  @Input() itemLabels:string[]=[]

  @Output() itemUpdated = new EventEmitter<void>();
  @Output() itemAdded= new EventEmitter<void>();
  @Output() itemDeleted = new EventEmitter<number>();

  @Output() cancel= new EventEmitter<void>();

  constructor(){}

  ngOnInit(): void {
    
  }

  openUpdateDialog(itemId: number) {
    console.log('Opening update dialog with itemId:', itemId); // Add this log
    this.selectedItemId = itemId;
    this.displayUpdateDialog = true;
  }

  onItemUpdated(){
    this.itemUpdated.emit();
    this.displayUpdateDialog=false
  }

  openAddDialog(){
    this.displayAddDialog= true
  }

  onItemAdded(){
    this.itemAdded.emit()
    this.displayAddDialog= false;
  }

  onCancel(){
    this.cancel.emit()
    this.displayUpdateDialog=false;
    this.displayAddDialog=false;
  }

  deleteItem(ItemId:number){
    Swal.fire({
      title: 'Are you sure?',
      text:"You won'nt be able to revert this!",
      icon:'warning',
      showCancelButton:true,
      confirmButtonAriaLabel:"Yes, delete!"
    }).then((result)=>{
      if(result.isConfirmed){
        this.itemDeleted.emit(ItemId);
        Swal.fire({  
          title: 'Deleted',
          text:"Your item has been deleted",
          icon:'success',
    })
  }
  });
  }

}
