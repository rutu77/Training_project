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
import { SidebarModule } from 'primeng/sidebar';
import { ScrollTopModule } from 'primeng/scrolltop';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { FooterComponent } from './footer/footer.component';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';


const  ngPrimeModule = [ButtonModule,InputTextModule,CheckboxModule,SidebarModule,ScrollTopModule,TableModule, DropdownModule,MenubarModule, MenuModule, MultiSelectModule, RippleModule, DialogModule]


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ngPrimeModule,
    FormsModule
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    ngPrimeModule
  ]
})
export class SharedModule { }
