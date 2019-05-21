import { NgModule } from '@angular/core';

import {
  MatToolbarModule, 
  MatIconModule,
  MatMenuModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule 
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule 
  ]
})

export class MaterialModule {};