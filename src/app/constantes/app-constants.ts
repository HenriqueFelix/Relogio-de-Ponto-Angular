import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export class AppConstants {
    public static get baseServidor(): string {
        return "http://localhost:8080/relogioponto";
    }

    public static get baseLogin(): string {
        return this.baseServidor + "/login";
    }

    public static get baseUsuarios(): string {
        return this.baseServidor + "/usuario/";
    }

    public static get baseContato(): string {
        return this.baseServidor + "/contato/";
    }

    public static verificarVariavel(variavel: any): boolean {
        if (variavel == null || variavel == undefined) {
            return false;
        }
        return true;
    }

    public static openSnackBar(matSnackBar: MatSnackBar, mensagem: string, durationInSeconds: number) {
        var horizontalPosition: MatSnackBarHorizontalPosition = 'center';
        var verticalPosition: MatSnackBarVerticalPosition = 'bottom';

        matSnackBar.open(mensagem, 'x', {
            horizontalPosition: horizontalPosition,
            verticalPosition: verticalPosition,
            duration: durationInSeconds * 1000,
        });
    }
}
