import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  mensagem: string;
}

@Component({
  selector: 'app-dialog-remover',
  templateUrl: './dialog-remover.component.html',
  styleUrls: ['./dialog-remover.component.scss']
})
export class DialogRemoverComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogRemoverComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,) {

  }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close({ removido: 0 });
  }

  onRemoverClick() {
    this.dialogRef.close({ removido: 1 });
  }
}
