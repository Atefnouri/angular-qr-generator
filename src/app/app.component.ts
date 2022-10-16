import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import { QRCodeElementType, QRCodeModule } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MaterialModule } from './Material/Material.module';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { OverlayComponent } from './overlay/app.overlay.component';








@Component({
  standalone:true,
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    QRCodeModule,
    MaterialModule,


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
  public limeTheme = false;
  public TextToConvert:string = "welcome";

  public textChecker:boolean = false;
  public phoneChecker:boolean = false;
  public linkChecker:boolean = false;
  public emailChecker:boolean = false;
  public qrCodeDownloadLink: SafeUrl = "";
  public qrCodeElmentType:QRCodeElementType ='img';
  public selectedTheme:string = "";
  public selectedColor:string = "";
  public qrCodeWidth:number = 256;
  public elementType:QRCodeElementType = "canvas";
  public imageSrc:string  = './assets/logo.png';
  public imageHeight:number = 79;
  public imageWidth:number = 79;

constructor(private _snackBar: MatSnackBar, private _bottomSheet: MatBottomSheet){
this.loadFromLocalStorage();

}

openDialog(){
  //this.dialog.open(OverlayComponent);
  this._bottomSheet.open(OverlayComponent);
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
  this.selectedTheme = this.darkMode ? "dark" : "light";

  }


  themeHandler = (e:any) =>{

    if(e == 'dark'){
      this.darkMode = true;
      this.selectedTheme  = 'dark';
    } else {
      this.darkMode = false;
      this.selectedTheme  = 'light';
    }

  }

  themeColorHandler = (e:any) =>{

    if(e == 'lime'){
      this.limeTheme = true;
      this.selectedColor  = e ;
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


  public  getColor = ():string =>{

      if(this.darkMode){
        return "#304ffe";
      } else {
        return "#536dfe";
      }

}


saveAsImage(parent: any) {
  let parentElement = null

  if (this.elementType === "canvas") {
    // fetches base 64 data from canvas
    parentElement = parent.qrcElement.nativeElement
      .querySelector("canvas")
      .toDataURL("image/png")
  } else if (this.elementType === "img" || this.elementType === "url") {
    // fetches base 64 data from image
    // parentElement contains the base64 encoded image src
    // you might use to store somewhere
    parentElement = parent.qrcElement.nativeElement.querySelector("img").src
  } else {
    alert("Set elementType to 'canvas', 'img' or 'url'.")
  }

  if (parentElement) {
    // converts base 64 encoded image to blobData
    let blobData = this.convertBase64ToBlob(parentElement)
    // saves as image
    const blob = new Blob([blobData], { type: "image/png" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    // name of the file
    link.download = "Qrcode"
    link.click()
  }
}


private convertBase64ToBlob(Base64Image: string) {
  // split into two parts
  const parts = Base64Image.split(";base64,")
  // hold the content type
  const imageType = parts[0].split(":")[1]
  // decode base64 string
  const decodedData = window.atob(parts[1])
  // create unit8array of size same as row data length
  const uInt8Array = new Uint8Array(decodedData.length)
  // insert all character code into uint8array
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i)
  }
  // return blob image after conversion
  return new Blob([uInt8Array], { type: imageType })
}

}







