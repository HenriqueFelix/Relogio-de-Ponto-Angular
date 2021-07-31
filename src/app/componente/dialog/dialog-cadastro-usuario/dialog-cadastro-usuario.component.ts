import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface DialogData {
  id: number;
  nome: string;
  label: string;
  tipo: number; //0 - CADASTRO; 1 - EDITAR;
}

@Component({
  selector: 'app-dialog-cadastro-usuario',
  templateUrl: './dialog-cadastro-usuario.component.html',
  styleUrls: ['./dialog-cadastro-usuario.component.scss']
})
export class DialogCadastroUsuarioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogCadastroUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router) {
    //
  }

  ngOnInit() {
  }

  onNovoUsuario() {
    this.dialogRef.close({ cadastrar: 1 });
  }

  onEditarUsuario() {
    this.dialogRef.close({ editar: 1 });
  }

  onListaUsuario() {
    this.dialogRef.close();

    this.router.navigate(['usuarios']);
  }
}
