import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumofinalComponent } from './resumofinal.component';

describe('ResumofinalComponent', () => {
  let component: ResumofinalComponent;
  let fixture: ComponentFixture<ResumofinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumofinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumofinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
