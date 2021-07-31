import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CustomProgressBarService } from '../../progress/custom-progress-bar.service';

@Component({
  selector: 'app-pontos',
  templateUrl: './pontos.component.html',
  styleUrls: ['./pontos.component.scss']
})
export class PontosComponent implements OnInit {

  filtro = { nome: '', cpf: '', login: '', data_incial: '', data_final: '' };

  constructor(private snackBar: MatSnackBar,
    private customProgress: CustomProgressBarService,) {
    //
  }

  ngOnInit() {
  }

}
