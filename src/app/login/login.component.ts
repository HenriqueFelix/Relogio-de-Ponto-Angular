import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomProgressBarService } from '../componente/progress/custom-progress-bar.service';
import { AppConstants } from '../constantes/app-constants';
import { LoginServiceService } from '../service/login-service.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario = { login: '', senha: '' };

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  senhaFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  hidePassword = true;

  constructor(private loginServiceService: LoginServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private readonly customProgress: CustomProgressBarService) {
    //
  }

  ngOnInit() {
    if (AppConstants.verificarVariavel(localStorage.getItem("token")) && localStorage.getItem("token").toString().trim() != "") {
      this.router.navigate(['home']);
    }
  }

  public loginAplicacao() {
    if (AppConstants.verificarVariavel(this.usuario.login) && this.usuario.login != "") {
      if (AppConstants.verificarVariavel(this.usuario.senha) && this.usuario.senha != "") {
        this.loginServiceService.login(this.usuario, this.snackBar, this.customProgress);
      }
    }
  }
}
