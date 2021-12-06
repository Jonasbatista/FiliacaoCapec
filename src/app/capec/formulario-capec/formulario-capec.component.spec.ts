import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCapecComponent } from './formulario-capec.component';

describe('FormularioCapecComponent', () => {
  let component: FormularioCapecComponent;
  let fixture: ComponentFixture<FormularioCapecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCapecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCapecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
