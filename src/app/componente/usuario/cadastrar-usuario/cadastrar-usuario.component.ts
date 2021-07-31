import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/constantes/app-constants';
import { Contato } from 'src/app/model/contato';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { DialogCadastroUsuarioComponent } from '../../dialog/dialog-cadastro-usuario/dialog-cadastro-usuario.component';
import { DialogRemoverComponent } from '../../dialog/dialog-remover/dialog-remover.component';
import { CustomProgressBarService } from '../../progress/custom-progress-bar.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent implements OnInit {

  usuario = new Usuario();

  idUsuarioEdicao: number = 0;
  tituloPagina: string = "Novo usuário";

  nomeFormControl = new FormControl('', [
    Validators.required,
  ]);

  cpfFormControl = new FormControl('', [
    Validators.required,
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  senhaFormControl = new FormControl('', [
    Validators.required,
  ]);

  contato = new Contato();

  constructor(private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private customProgress: CustomProgressBarService) {
    //
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (AppConstants.verificarVariavel(params) && AppConstants.verificarVariavel(params.user)) {
        this.idUsuarioEdicao = params.user;

        if (this.idUsuarioEdicao > 0) {
          this.tituloPagina = "Editar usuário";

          this.usuario.id = this.idUsuarioEdicao;

          this.carregarDadosUsuario(this.idUsuarioEdicao);

          this.emailFormControl.disable();
          this.senhaFormControl = new FormControl('', []);
        } else {
          this.idUsuarioEdicao = 0;
        }
      }
    });
  }

  carregarDadosUsuario(idUsuario: number) {
    this.customProgress.show();

    this.usuarioService.getUsuarioId(idUsuario).subscribe(
      data => {
        //console.log(data);
        if (AppConstants.verificarVariavel(data)) {
          try {
            if (data.valido == 1) {
              this.usuario = data.usuario;
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

  cadastrarUsuario() {
    //console.log(this.usuario);
    if (AppConstants.verificarVariavel(this.usuario)) {
      if (AppConstants.verificarVariavel(this.usuario.senha) && this.usuario.senha != "") {
        if (this.usuario.senha != this.usuario.senha_confirm) {
          AppConstants.openSnackBar(this.snackBar, "Confirme a senha corretamente.", 5);
          return false;
        } else if (this.usuario.senha.length < 6) {
          AppConstants.openSnackBar(this.snackBar, "A senha deve conter no mínimo 6 caracteres.", 5);
          return false;
        }
      } else {
        AppConstants.openSnackBar(this.snackBar, "Informe a senha.", 5);
        return false;
      }

      this.customProgress.show();

      this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
        data => {
          //console.log(data);
          if (AppConstants.verificarVariavel(data)) {
            try {
              if (data.valido == 1) {
                this.openDialog(this.usuario, 0);
                this.usuario = new Usuario();
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
  }

  editarUsuario() {
    //console.log(this.usuario);
    if (this.idUsuarioEdicao > 0 && AppConstants.verificarVariavel(this.usuario) && AppConstants.verificarVariavel(this.usuario.id)) {
      if (AppConstants.verificarVariavel(this.usuario.senha) && this.usuario.senha != "") {
        if (this.usuario.senha != this.usuario.senha_confirm) {
          AppConstants.openSnackBar(this.snackBar, "Confirme a senha corretamente.", 5);
          return false;
        } else if (this.usuario.senha.length < 6) {
          AppConstants.openSnackBar(this.snackBar, "A senha deve conter no mínimo 6 caracteres.", 5);
          return false;
        }
      }

      this.customProgress.show();

      this.usuarioService.editarUsuario(this.usuario).subscribe(
        data => {
          //console.log(data);
          if (AppConstants.verificarVariavel(data)) {
            try {
              if (data.valido == 1) {
                this.openDialog(this.usuario, 1);
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
    } else {
      AppConstants.openSnackBar(this.snackBar, "Ops! Erro ao validar id.", 5);
    }
  }

  openDialog(usu: Usuario, tipoModal: number): void {
    var msg = "Usuário cadastrado com sucesso.";

    if (tipoModal == 1) {
      msg = "Dados do usuário alterado com sucesso.";
    }

    const dialogRef = this.dialog.open(DialogCadastroUsuarioComponent, {
      width: '320px',
      data: { id: usu.id, nome: usu.nome, tipo: tipoModal, label: msg },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (AppConstants.verificarVariavel(result)) {
        if (AppConstants.verificarVariavel(result.cadastrar) && result.cadastrar == 1) {
          //console.log("Modal return => cadastrar");
        } else if (AppConstants.verificarVariavel(result.editar) && result.editar == 1) {
          //console.log("Modal return => editar");
        }
      }
    });
  }

  adicionarContato() {
    if (!AppConstants.verificarVariavel(this.usuario.contatos)) {
      this.usuario.contatos = new Array<Contato>();
    }

    this.contato.id = null;
    this.contato.email = null;

    this.usuario.contatos.push(this.contato);

    this.contato = new Contato();
  }

  dialogRemoverContato(contato: Contato, index: any) {
    if (!AppConstants.verificarVariavel(contato)) {
      return false;
    } else if (!AppConstants.verificarVariavel(contato.id)) {
      this.usuario.contatos.splice(index, 1);
    } else {
      const dialogRef = this.dialog.open(DialogRemoverComponent, {
        width: '320px',
        data: { mensagem: "Deseja remover o telefone: " + contato.telefone + "?" },
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (AppConstants.verificarVariavel(result)) {
          if (AppConstants.verificarVariavel(result.removido) && result.removido == 1) {
            this.removerContato(contato, index);
          }
        }
      });
    }
  }

  removerContato(contato: Contato, index: any) {
    if (!AppConstants.verificarVariavel(contato)) {
      return false;
    }

    if (!AppConstants.verificarVariavel(contato.id)) {
      this.usuario.contatos.splice(index, 1);
    } else if (this.idUsuarioEdicao > 0 && contato.id > 0) {
      this.customProgress.show();

      this.usuarioService.deleteContato(contato.id).subscribe(
        data => {
          console.log(data);
          if (AppConstants.verificarVariavel(data)) {
            try {
              if (data.valido == 1) {
                this.usuario.contatos.splice(index, 1);
              } else {
                AppConstants.openSnackBar(this.snackBar, data.mensagem, 5);
              }
            } catch (e) {
              console.error(e);

              AppConstants.openSnackBar(this.snackBar, "Ops! Erro ao remover.", 5);
            }
          } else {
            AppConstants.openSnackBar(this.snackBar, "Não foi possível remover os dados.", 5);
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
            AppConstants.openSnackBar(this.snackBar, "Ops! Erro ao remover dados.", 5);
          }
        }
      );
    }
  }
}
