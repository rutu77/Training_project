import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect'
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';

const  ngPrimeModule = [ButtonModule,InputTextModule,CheckboxModule, DropdownModule,MenubarModule, MultiSelectModule, RippleModule]


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ngPrimeModule,
    FormsModule
  ],
  exports:[
    NavbarComponent,
    ngPrimeModule
  ]
})
export class SharedModule { }
