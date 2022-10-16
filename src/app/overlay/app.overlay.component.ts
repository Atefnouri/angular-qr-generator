
import { Component } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';



@Component({
  selector: 'app-overlay',
  templateUrl: './app.overlay.component.html',
  styleUrls: ['./app.overlay.component.scss']
})
export class OverlayComponent {

  constructor(private _bottomSheetRef: MatBottomSheetRef<OverlayComponent>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
