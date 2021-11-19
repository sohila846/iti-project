import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideprofileComponent } from './provideprofile.component';

describe('ProvideprofileComponent', () => {
  let component: ProvideprofileComponent;
  let fixture: ComponentFixture<ProvideprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvideprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvideprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
