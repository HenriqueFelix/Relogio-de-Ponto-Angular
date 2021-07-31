import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRemoverComponent } from './dialog-remover.component';

describe('DialogRemoverComponent', () => {
  let component: DialogRemoverComponent;
  let fixture: ComponentFixture<DialogRemoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRemoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRemoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
