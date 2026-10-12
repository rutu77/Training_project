import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import {MultiSelectModule} from 'primeng/multiselect'
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { ScrollTopModule } from 'primeng/scrolltop';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { GenericListComponent } from './generic-list/generic-list.component';
import { RatingModule } from 'primeng/rating';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    GenericListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RatingModule,
    ProgressSpinnerModule,
    ScrollTopModule,
    TableModule,
    SelectModule,
    MenubarModule,
    MenuModule,
    MultiSelectModule,
    RippleModule,
    DialogModule,
    ToastModule,
    FormsModule
  ],
  exports:[
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RatingModule,
    ProgressSpinnerModule,
    ScrollTopModule,
    TableModule,
    SelectModule,
    MenubarModule,
    MenuModule,
    MultiSelectModule,
    RippleModule,
    DialogModule,
    ToastModule,
    GenericListComponent
  ]
})

export class SharedModule { }
