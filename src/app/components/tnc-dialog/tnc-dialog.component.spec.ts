import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TncDialogComponent } from './tnc-dialog.component';

describe('TncDialogComponent', () => {
  let component: TncDialogComponent;
  let fixture: ComponentFixture<TncDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TncDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TncDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
