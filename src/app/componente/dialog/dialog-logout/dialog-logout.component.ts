import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  token: string;
  tipo: number;
}

@Component({
  selector: 'app-dialog-logout',
  templateUrl: './dialog-logout.component.html',
  styleUrls: ['./dialog-logout.component.scss']
})
export class DialogLogoutComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogLogoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    //
  }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onLogoutClick() {
    localStorage.clear();

    this.dialogRef.close({ logout: 1 });
  }
}
