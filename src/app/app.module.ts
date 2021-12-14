import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FiliacaoModule } from './filiacao/filiacao.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapecModule } from './capec/capec.module';
import { ResumoFinalModule } from './resumo-final/resumo-final.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FiliacaoModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    CapecModule,
    ResumoFinalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
