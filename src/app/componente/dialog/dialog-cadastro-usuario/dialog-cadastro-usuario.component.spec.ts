import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCadastroUsuarioComponent } from './dialog-cadastro-usuario.component';

describe('DialogCadastroUsuarioComponent', () => {
  let component: DialogCadastroUsuarioComponent;
  let fixture: ComponentFixture<DialogCadastroUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCadastroUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCadastroUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
