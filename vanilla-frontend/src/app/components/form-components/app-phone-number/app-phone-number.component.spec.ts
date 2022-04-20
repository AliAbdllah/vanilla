import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AppPhoneNumberComponent } from "./app-phone-number.component";

describe("PhoneNumberComponent", () => {
  let component: AppPhoneNumberComponent;
  let fixture: ComponentFixture<AppPhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppPhoneNumberComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
