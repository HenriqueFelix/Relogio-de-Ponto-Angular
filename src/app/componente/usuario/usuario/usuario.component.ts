import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { AppConstants } from 'src/app/constantes/app-constants';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { CustomProgressBarService } from '../../progress/custom-progress-bar.service';
import { DialogRemoverComponent } from '../../dialog/dialog-remover/dialog-remover.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  usuarios: Observable<Usuario[]>;

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'login', 'btn-remover', 'btn-editar'];

  filtro = { nome: '', cpf: '', login: '' };

  constructor(private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private customProgress: CustomProgressBarService,
    private dialog: MatDialog,
    private router: Router) {
    //
  }

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.customProgress.show();

    this.usuarioService.getUsuarioList().subscribe(
      data => {
        //console.log(data);
        if (AppConstants.verificarVariavel(data)) {
          try {
            if (data.valido == 1) {
              this.usuarios = data.usuarios;
            } else {
              AppConstants.openSnackBar(this.snackBar, data.mensagem, 5);
            }
          } catch (e) {
            console.error(e);

            AppConstants.openSnackBar(this.snackBar, "Ops! Erro ao verificar dados.", 5);
          }
        } else {
          AppConstants.openSnackBar(this.snackBar, "Não foi possível verificar os dados.", 5);
        }

        this.customProgress.hide();
      },
      error => {
        console.error(error);

        this.customProgress.hide();

        if (AppConstants.verificarVariavel(error.status) && parseInt(error.status) == 0) {
          AppConstants.openSnackBar(this.snackBar, "Ops! Servidor fora do ar. Tente novamente em alguns minutos.", 5);
        } else if (AppConstants.verificarVariavel(error.status) && parseInt(error.status) == 403) {
          AppConstants.openSnackBar(this.snackBar, "Acesso negado! Realize o login novamente.", 5);
        } else {
          AppConstants.openSnackBar(this.snackBar, "Ops! Erro ao carregar dados.", 5);
        }
      }
    );
  }

  dialogRemoverUsuario(usu: Usuario) {
    const dialogRef = this.dialog.open(DialogRemoverComponent, {
      width: '320px',
      data: { mensagem: "Deseja remover o usuário: " + usu.nome + "?" },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (AppConstants.verificarVariavel(result)) {
        if (AppConstants.verificarVariavel(result.removido) && result.removido == 1) {
          this.deletarUsuario(usu);
        }
      }
    });

    /*
    if (confirm("Deseja remover o usuário: " + usu.nome)) {
      this.deletarUsuario(usu);
    }
    */
  }

  deletarUsuario(usu: Usuario) {
    this.customProgress.show();

    this.usuarioService.deleteUsuario(usu.id).subscribe(
      data => {
        if (AppConstants.verificarVariavel(data)) {
          try {
            if (data.valido == 1) {
              this.carregarUsuarios();
            } else {
              AppConstants.openSnackBar(this.snackBar, data.mensagem, 5);
            }
          } catch (e) {
            console.error(e);

            AppConstants.openSnackBar(this.snackBar, "Ops! Erro ao remover.", 5);
          }
        } else {
          AppConstants.openSnackBar(this.snackBar, "Não foi possível remover.", 5);
        }

        this.customProgress.hide();
      },
      error => {
        console.error(error);

        this.customProgress.hide();

        if (AppConstants.verificarVariavel(error.status) && parseInt(error.status) == 0) {
          AppConstants.openSnackBar(this.snackBar, "Ops! Servidor fora do ar. Tente novamente em alguns minutos.", 5);
        } else if (AppConstants.verificarVariavel(error.status) && parseInt(error.status) == 403) {
          AppConstants.openSnackBar(this.snackBar, "Acesso negado! Realize o login novamente.", 5);
        } else {
          AppConstants.openSnackBar(this.snackBar, "Ops! Erro ao realizar operação.", 5);
        }
      }
    );
  }

  consultarUsuario() {
    this.usuarios = null;
    
    this.customProgress.show();

    var nome = this.filtro.nome;

    if (nome == "") {
      nome = "@null@";
    }

    this.usuarioService.consultarUsuario(nome).subscribe(
      data => {
        //console.log(data);
        if (AppConstants.verificarVariavel(data)) {
          try {
            if (data.valido == 1) {
              this.usuarios = data.usuarios;
            } else {
              AppConstants.openSnackBar(this.snackBar, data.mensagem, 5);
            }
          } catch (e) {
            console.error(e);

            AppConstants.openSnackBar(this.snackBar, "Ops! Erro ao verificar dados.", 5);
          }
        } else {
          AppConstants.openSnackBar(this.snackBar, "Não foi possível verificar os dados.", 5);
        }

        this.customProgress.hide();
      },
      error => {
        console.error(error);

        this.customProgress.hide();

        if (AppConstants.verificarVariavel(error.status) && parseInt(error.status) == 0) {
          AppConstants.openSnackBar(this.snackBar, "Ops! Servidor fora do ar. Tente novamente em alguns minutos.", 5);
        } else if (AppConstants.verificarVariavel(error.status) && parseInt(error.status) == 403) {
          AppConstants.openSnackBar(this.snackBar, "Acesso negado! Realize o login novamente.", 5);
        } else {
          AppConstants.openSnackBar(this.snackBar, "Ops! Erro ao carregar dados.", 5);
        }
      }
    );
  }

  openEditarUsuario(usu: Usuario) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "user": usu.id
      }
    };

    this.router.navigate(["usuario_cadastro"],  navigationExtras);
  }

  openCadastroUsuario() {
    this.router.navigate(['usuario_cadastro']);
  }
}
