import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPlayerComponent } from './modal/add-player/add-player.component';

@NgModule({
  declarations: [PagesComponent, AddPlayerComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
    DynamicDialogModule,
    InputTextModule,
    ReactiveFormsModule,
    InputNumberModule,
  ],
  providers: [DialogService],
})
export class PagesModule {}
