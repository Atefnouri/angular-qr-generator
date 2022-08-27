import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
//import { QRCodeModule } from 'angularx-qrcode/lib/angularx-qrcode.module';
import { QRCodeElementType, QRCodeModule } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
//import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';






@Component({
  standalone:true,
  imports: [
    MatSliderModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    CommonModule,
    FormsModule,
    MatChipsModule,
    QRCodeModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSidenavModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public qrForm = {
    qrText: '',
  }
  title = 'angularqrgen';
  public darkMode = false;
  public TextToConvert:string = "welcome";

  public textChecker:boolean = false;
  public phoneChecker:boolean = false;
  public linkChecker:boolean = false;
  public emailChecker:boolean = false;
  public qrCodeDownloadLink: SafeUrl = "";
  public qrCodeElmentType:QRCodeElementType ='img';

constructor(private _snackBar: MatSnackBar){
this.loadFromLocalStorage();
}


  loadFromLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      this.qrCodeElmentType = (localStorage.getItem('qrCodeElmentType')! as QRCodeElementType) ;
  } else {
    (localStorage as Storage).setItem('qrCodeElmentType','img');
  }
  }


  // private getLoclStorage():string{
  //   //return localStorage.getItem('qrCodeElmentType');
  // }


// openDialogHandler() {
//   const dialogRef = this.dialog.open(SettingsDialogueCdompoentns);
//   console.log(dialogRef);

//   dialogRef.afterClosed().subscribe(result => {
//     console.log(`Dialog result: ${result}`);
//   });
// }




  public sendForm = () => {
    //console.log(this.qrForm);
    //console.log(this.qrForm.qrText);
    this.TextToConvert = this.qrForm.qrText;
    console.log("qr is gernerated");


  }


  saveSettingHandler = () => {
    this._snackBar.open("Settings are saved 😄", "done");
  }

  // public toggleDarkMode = () => {
  //   this.darkMode = !this.darkMode;
  //   console.log(this.darkMode);
  // }
  //(change)="parsText();"

  public parsText = () => {

    //this.textChecker = this.regexHandler(1);
    this.TextToConvert = this.qrForm.qrText;
    this.phoneChecker = this.regexHandler(1);
    this.linkChecker = this.regexHandler(2);
    this.emailChecker = this.regexHandler(3);

  }


  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }


  private regexHandler = (nb :number):boolean => {

    let regex :RegExp;

    switch (nb) {

      //check phone number
      case 1:
      regex = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/ig;
      return regex.test( this.qrForm.qrText);
      break;
      //check url
      case 2:
      regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
      return regex.test( this.qrForm.qrText);
      break;
      //email
      case 3:
      regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ig;
      return regex.test( this.qrForm.qrText);
      break;

      default:
        return false;
        break;
    }
  }


  changeTypeHandler = (e:any) =>{
    console.log("value is changed",e);
    localStorage.setItem('qrCodeElmentType',e);

  }





}







