import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppConstants } from '../constantes/app-constants';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario, matSnackBar: any, customProgress: any) {
    if (customProgress != null) {
      customProgress.show();
    }

    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(
      data => {
        //console.log(data);
        try {
          if (AppConstants.verificarVariavel(data)) {
            let JSONRet = JSON.parse(JSON.stringify(data));
            if (AppConstants.verificarVariavel(JSONRet.Authorization)) {
              var token = JSONRet.Authorization.split(" ")[1];

              localStorage.setItem("token", token);

              //console.log("TOKEN: " + token);

              this.router.navigate(['home']);
            } else {
              localStorage.clear();

              alert("Ops! Não foi possível realizar login!");
            }
          } else {
            localStorage.clear();

            alert("Falha ao realizar login!");
          }
        } catch (e) {
          console.error(e);

          localStorage.clear();

          alert("Erro ao acessar a aplicação!");
        }

        if (customProgress != null) {
          customProgress.hide();
        }
      },
      error => {
        console.error(error);

        localStorage.clear();
        
        if (AppConstants.verificarVariavel(error.status) && parseInt(error.status) == 0) {
          AppConstants.openSnackBar(matSnackBar, "Ops! Servidor fora do ar. Tente novamente em alguns minutos.", 5);
        } else if (AppConstants.verificarVariavel(error.status) && parseInt(error.status) == 403) {
          AppConstants.openSnackBar(matSnackBar, "Acesso negado! Verifique seus dados de login.", 5);
        } else {
          AppConstants.openSnackBar(matSnackBar, "Ops! Erro ao realizar login.", 5);
        }

        if (customProgress != null) {
          customProgress.hide();
        }
      }
    );
  }
}
