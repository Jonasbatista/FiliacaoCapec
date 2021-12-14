import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioCapecComponent } from './formulario-capec/formulario-capec.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { UpperCaseDirective } from './formulario-capec/upper-case.directive';


@NgModule({
  declarations: [
    FormularioCapecComponent,
    UpperCaseDirective
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDividerModule
  ],
  exports: [FormularioCapecComponent]
})
export class CapecModule { }
