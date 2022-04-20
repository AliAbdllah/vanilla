import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTextComponent } from './app-text.component';

describe('AppTextComponent', () => {
  let component: AppTextComponent;
  let fixture: ComponentFixture<AppTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
