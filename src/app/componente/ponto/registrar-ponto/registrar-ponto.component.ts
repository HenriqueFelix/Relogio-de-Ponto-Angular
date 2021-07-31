import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { AppConstants } from 'src/app/constantes/app-constants';
import { CustomProgressBarService } from '../../progress/custom-progress-bar.service';

@Component({
  selector: 'app-registrar-ponto',
  templateUrl: './registrar-ponto.component.html',
  styleUrls: ['./registrar-ponto.component.scss']
})
export class RegistrarPontoComponent implements OnInit {

  horaAtual: string = "00:00:00";
  dataAtual: string = "00";

  constructor(private snackBar: MatSnackBar,
    private customProgress: CustomProgressBarService,) { }

  ngOnInit() {
    setInterval(() => {
      var dateNow = new Date();

      var seconds = dateNow.getSeconds();
      var minutes = dateNow.getMinutes();
      var hour = dateNow.getHours();

      var year = dateNow.getFullYear();
      var month = dateNow.getMonth() + 1; // beware: January = 0; February = 1, etc.
      var day = dateNow.getDate();

      this.horaAtual = hour.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');

      this.dataAtual = day.toString().padStart(2, '0') + "/" + month.toString().padStart(2, '0') + "/" + year.toString().padStart(4, '0');
    }, 100);
  }

  public webcamImage: WebcamImage = null;

  private triggerWebcam: Subject<void> = new Subject<void>();
  triggerSnapshot(): void {
    this.triggerWebcam.next();
  }

  handleImage(webcamImage: WebcamImage): void {
    //console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.triggerWebcam.asObservable();
  }

  clearSnapshot() {
    this.webcamImage = null;
  }

  handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
      //zzz
    }
  }

  registrarPonto(tipo: number) {
    if (!AppConstants.verificarVariavel(this.webcamImage)) {
      AppConstants.openSnackBar(this.snackBar, "Realize a fotográfia para prosseguir.", 5);
      return false;
    }

    console.log(tipo);
    console.log(this.dataAtual);
    console.log(this.horaAtual);
  }
}
