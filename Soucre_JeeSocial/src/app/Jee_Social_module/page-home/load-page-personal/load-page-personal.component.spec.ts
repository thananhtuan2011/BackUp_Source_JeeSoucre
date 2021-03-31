import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPagePersonalComponent } from './load-page-personal.component';

describe('LoadPagePersonalComponent', () => {
  let component: LoadPagePersonalComponent;
  let fixture: ComponentFixture<LoadPagePersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadPagePersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadPagePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
