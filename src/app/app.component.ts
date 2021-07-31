import { Component, OnInit } from '@angular/core';
import { AppConstants } from './constantes/app-constants';
import { Router } from '@angular/router';
import { MatDialog, MatSidenav } from '@angular/material';
import { ViewChild } from '@angular/core';
import { DialogLogoutComponent } from './componente/dialog/dialog-logout/dialog-logout.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'relogio-ponto';

  @ViewChild('drawer', { static: true }) drawer: MatSidenav;

  constructor(private router: Router, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    if (!AppConstants.verificarVariavel(localStorage.getItem("token")) || localStorage.getItem("token").toString().trim() == "") {
      this.router.navigate(['login']);
    }

    this.router.events.subscribe(event => {
      this.drawer.close();
    });
  }

  public sairSistema() {
    localStorage.clear();

    this.router.navigate(['login']);

    try {
      this.drawer.close();
    } catch (e) {
      console.error(e);
    }
  }

  openDialogLogout(): void {
    const dialogRef = this.dialog.open(DialogLogoutComponent, {
      width: '320px',
      data: { tipo: 1 },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (AppConstants.verificarVariavel(result)) {
        if (AppConstants.verificarVariavel(result.logout) && result.logout == 1) {
          this.sairSistema();
        }
      }
    });
  }

  public exibirMenu() {
    if (AppConstants.verificarVariavel(localStorage.getItem("token")) && localStorage.getItem("token").toString().trim() != "") {
      return true;
    } else {
      return false;
    }
  }
}
