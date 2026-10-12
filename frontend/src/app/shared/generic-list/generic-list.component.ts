import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generic-list',
  standalone: false,
  templateUrl: './generic-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './generic-list.component.css',
})
export class GenericListComponent<T> implements OnChanges {
  @Input() items: T[] = [];
  @Input() itemFields: string[] = [];
  @Input() itemLabels: string[] = [];
  @Input() isUser: boolean = false;
  @Input() isLoading: boolean = true;
  @Input() loadError = '';
  @Input() heading = 'Manage records';
  @Input() description = 'Search and update your content from one place.';
  @Input() emptyMessage = 'No records have been added yet.';

  @Output() addItem = new EventEmitter<void>();
  @Output() updateItem = new EventEmitter<number>();
  @Output() deleteItem = new EventEmitter<number>();
  @Output() retryLoad = new EventEmitter<void>();

  filteredItems: T[] = [];
  searchText: string = '';

  ngOnChanges(_changes: SimpleChanges): void {
    if (!Array.isArray(this.items)) this.items = [];
    this.filterItems();
  }

  getFieldValue(item: any, fieldPath: string) {
    return fieldPath.split('.').reduce((obj, key) => obj?.[key], item);
  }

  getDisplayValue(item: T, fieldPath: string): unknown {
    const value = this.getFieldValue(item, fieldPath);
    if (fieldPath === 'isPublished' && typeof value === 'boolean') {
      return value ? 'Published' : 'Unpublished (draft)';
    }
    return value;
  }

  filterItems() {
    const searchValue = this.searchText.toLowerCase();
    this.filteredItems = this.items.filter((item) => {
      return this.itemFields.some((field) => {
        const value = this.getFieldValue(item, field);
        return value?.toString().toLowerCase().includes(searchValue);
      });
    });
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
      confirmButtonText: 'Yes, delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteItem.emit(id);
      }
    });
  }
}
