import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import { QRCodeElementType, QRCodeModule } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MaterialModule } from './Material/Material.module';






@Component({
  standalone:true,
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    QRCodeModule,
    MaterialModule

  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
      //let darModeVal = localStorage.getItem('darkMode');
      this.darkMode =    Boolean(JSON.parse((localStorage.getItem('darkMode') as string)));

  } else {
    (localStorage as Storage).setItem('qrCodeElmentType','img');
    (localStorage as Storage).setItem('darkMode',String(this.darkMode));
  }
  }


  themeHandler = (e:any) =>{

    if(e == 'dark'){
      this.darkMode = true;
    } else {
      this.darkMode = false;
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

    let snackClass = this.darkMode ? "darkSnackBar" : "lightSnackBar";
    this._snackBar.open("settings saved ✔️", 'dismiss',
    {
      duration: 2000,
      panelClass: [snackClass]
    });

    localStorage.setItem('darkMode',String(this.darkMode));
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







