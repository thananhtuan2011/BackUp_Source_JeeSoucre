import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadLuutruComponent } from './load-luutru.component';

describe('LoadLuutruComponent', () => {
  let component: LoadLuutruComponent;
  let fixture: ComponentFixture<LoadLuutruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadLuutruComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadLuutruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
