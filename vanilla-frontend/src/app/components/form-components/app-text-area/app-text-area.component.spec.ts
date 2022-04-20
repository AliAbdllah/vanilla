import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTextAreaComponent } from './app-text-area.component';

describe('AppTextAreaComponent', () => {
  let component: AppTextAreaComponent;
  let fixture: ComponentFixture<AppTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppTextAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
