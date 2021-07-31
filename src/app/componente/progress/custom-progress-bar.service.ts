import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { CustomProgressBarComponent } from './custom-progress-bar/custom-progress-bar.component';

@Injectable({
  providedIn: 'root'
})
export class CustomProgressBarService {
  private overlayRef: OverlayRef = undefined;

  constructor(private overlay: Overlay) { }

  public show(): void {
    Promise.resolve(null).then(() => {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        hasBackdrop: true,
      });
      this.overlayRef.attach(new ComponentPortal(CustomProgressBarComponent));
    });
  }

  public hide(): void {
    this.overlayRef.detach();
    this.overlayRef = undefined;
  }
}
