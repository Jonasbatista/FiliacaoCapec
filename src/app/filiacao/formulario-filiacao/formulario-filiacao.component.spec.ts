import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioFiliacaoComponent } from './formulario-filiacao.component';

describe('FormularioFiliacaoComponent', () => {
  let component: FormularioFiliacaoComponent;
  let fixture: ComponentFixture<FormularioFiliacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioFiliacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioFiliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
